/**
 * Module for the AccountController.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

// import createError from 'http-errors'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { UserModel } from '../../models/user.js'
import { RecordModel } from '../../models/record.js'

/**
 * Encapsulates a controller.
 */
export class RecordController {
  /**
   * Authenticates a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    try {
      const user = await UserModel.authenticate(req.body.username, req.body.password)

      const token = Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64')

      const payload = {
        sub: user.username,
        given_name: user.firstName,
        family_name: user.lastName,
        email: user.email,
        id: user._id
      }

      // Create the access token with the shorter lifespan.
      const accessToken = jwt.sign(payload, token, {
        algorithm: 'RS256',
        expiresIn: process.env.ACCESS_TOKEN_LIFE
      })

      res
        .status(200)
        .json({
          access_token: accessToken
          // refresh_token: refreshToken
        })
    } catch (error) {
      // Authentication failed.
      const err = createError(401)
      err.cause = error

      next(err)
    }
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
  async authenticate (req, res, next) {
    try {
      // if (firebase.apps.length === 0) {
      //   initializeApp({
      //     credential: firebase.credential.cert(firebaseConfig)
      //   })
      // }

      // const header = req.headers?.authorization

      // if (header !== 'Bearer null' && req.headers?.authorization?.startsWith('Bearer ')) {
      //   const idToken = req.headers.authorization.split('Bearer ')[1]
      //   await getAuth().verifyIdToken(idToken)
      //   next()
      // } else {
      //   const error = createError(401)
      //   next(error)
      // }
      next()
    } catch (err) {
      let error = err
      if (err.code === 'auth/argument-error' || err.code === 'auth/id-token-expired') {
        error = createError(401)
      }
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
      const records = await RecordModel.find()
      if (records !== null) {
        res.status(200).send(records)
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
      const record = await RecordModel.findById(req.params.id)

      if (record.id.length > 0 && record.id !== null) {
        res.status(200).send(record)
      } else {
        next(createError(404, 'The requested resource was not found.'))
      }
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
      const record = new RecordModel({
        artist: req.body.artist,
        recordTitle: req.body.recordTitle,
        releaseYear: req.body.releaseYear,
        uri: req.body.uri
      })

      await record.save()
      res.sendStatus(201)
    } catch (error) {
      console.log(error)
    }
  }
}
