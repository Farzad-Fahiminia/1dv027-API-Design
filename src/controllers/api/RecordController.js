/**
 * Module for the AccountController.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { RecordModel } from '../../models/record.js'
import { RecordRepository } from '../../repositories/RecordRepository.js'
import { RecordService } from '../../services/RecordService.js'
import { WebhookService } from '../../services/WebhookService.js'

/**
 * Encapsulates a controller.
 */
export class RecordController {
  /**
   * The repository.
   *
   * @type {RecordRepository}
   */
  #repository
  /**
   * The service.
   *
   * @type {RecordService}
   */
  #service
  /**
   * The webhook service.
   *
   * @type {WebhookService}
   */
  #webhookService

  /**
   * Initializes a new instance.
   *
   * @param {RecordRepository} repository - A repository instantiated from a class with the same capabilities as RecordRepository.
   * @param {RecordService} service - A service instantiated from a class with the same capabilities as RecordService.
   * @param {WebhookService} webhookService - A service instantiated from a class with the same capabilities as WebhookService.
   */
  constructor (repository = new RecordRepository(), service = new RecordService(), webhookService = new WebhookService()) {
    this.#repository = repository
    this.#service = service
    this.#webhookService = webhookService
  }

  /**
   * Authenticates requests.
   *
   * If authentication is successful, `req.user`is populated and the
   * request is authorized to continue.
   * If authentication fails, an unauthorized response will be sent.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  authenticateJWT = (req, res, next) => {
    try {
      const publicKey = Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64')
      const [authenticationScheme, token] = req.headers.authorization?.split(' ')

      if (authenticationScheme !== 'Bearer') {
        next(createError(400, 'The request cannot or will not be processed due to something that is perceived to be a client error (for example, validation error).'))
      }

      const payload = jwt.verify(token, publicKey)
      req.user = {
        username: payload.sub,
        password: payload.password,
        firstName: payload.given_name,
        lastName: payload.family_name,
        id: payload.id
      }

      next()
    } catch (err) {
      const error = createError(401)
      error.cause = err
      next(error)
    }
  }

  /**
   * Get records.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getAllRecords (req, res, next) {
    try {
      const records = await this.#repository.getAllRecords()
      const apiResponse = await this.#service.getAllRecordsApi(records, req)

      if (records !== null) {
        res
          .status(200)
          .json(apiResponse)
      } else {
        res.status(404)
      }
    } catch (error) {
      console.log(error)
      const err = createError(500, 'An unexpected condition was encountered.')
      err.cause = error

      next(err)
    }
  }

  /**
   * Get specific record.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async getRecord (req, res, next) {
    try {
      const record = await this.#repository.getRecord(req)
      if (!record) {
        next(createError(404, 'The requested resource was not found.'))
        return
      }
      const apiResponse = await this.#service.getRecordApi(req, record)

      res
        .status(200)
        .json(apiResponse)
    } catch (error) {
      console.log(error)
      const err = createError(500, 'An unexpected condition was encountered.')
      err.cause = error

      next(err)
    }
  }

  /**
   * Post record.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async addRecord (req, res, next) {
    try {
      if (req.body.artist === undefined || req.body.recordTitle === undefined || req.body.releaseYear === undefined) {
        const err = createError(400, 'Bad request.')

        next(err)
      } else {
        const record = await this.#repository.addRecord(req)
        const apiResponse = this.#service.getRecordApi(req, record)
        this.#webhookService.emitNewRecord(record)

        res
          .status(201)
          .json(apiResponse)
      }
    } catch (error) {
      next(error)
    }
  }

  /**
   * Put record.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async putRecord (req, res, next) {
    try {
      if (req.body === undefined) {
        next(createError(400, 'The request cannot or will not be processed due to something that is perceived to be a client error (for example validation error).'))
      } else {
        const record = await RecordModel.findById(req.params.id)

        if (record) {
          if (req.user.id === record.userId) {
            const record = await this.#repository.putRecord(req)

            const apiResponse = await this.#service.getRecordApi(req, record)

            res
              .status(200)
              .json(apiResponse)
          } else {
            next(createError(403, 'The request contained valid data and was understood by the server, but the server is refusing action due to the authenticated user not having the necessary permissions for the resource.'))
          }
        } else {
          next(createError(404, 'The requested resource was not found.'))
        }
      }
    } catch (error) {
      const err = createError(500, 'An unexpected condition was encountered.')
      err.cause = error

      next(err)
    }
  }

  /**
   * Patch a specific record.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async patchRecord (req, res, next) {
    try {
      const record = await RecordModel.findById(req.params.id)

      if (record) {
        if (req.user.id === record.userId) {
          const record = await this.#repository.patchRecord(req)

          const apiResponse = await this.#service.getRecordApi(req, record)

          res
            .status(200)
            .json(apiResponse)
        } else {
          next(createError(403, 'The request contained valid data and was understood by the server, but the server is refusing action due to the authenticated user not having the necessary permissions for the resource.'))
        }
      } else {
        next(createError(404, 'The requested resource was not found.'))
      }
    } catch (error) {
      let err = error
      if (err.name === 'ValidationError') {
        err = createError(400)
      }

      next(err)
    }
  }

  /**
   * Delete specific record.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async deleteRecord (req, res, next) {
    try {
      const record = await RecordModel.findById(req.params.id)
      if (record) {
        if (req.user.id === record.userId) {
          await this.#repository.deleteRecord(record)

          const apiResponse = await this.#service.getBaseApi(req)

          res
            .status(200)
            .json(apiResponse)
        } else {
          next(createError(403, 'The request contained valid data and was understood by the server, but the server is refusing action due to the authenticated user not having the necessary permissions for the resource.'))
        }
      } else {
        next(createError(404, 'The requested resource was not found.'))
      }
    } catch (error) {
      const err = createError(500, 'An unexpected condition was encountered.')
      err.cause = error

      next(err)
    }
  }
}
