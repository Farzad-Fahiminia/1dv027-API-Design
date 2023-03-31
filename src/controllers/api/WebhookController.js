/**
 * Module for the AccountController.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import createError from 'http-errors'
import { WebhookRepository } from '../../repositories/WebhookRepository.js'

/**
 * Encapsulates a controller.
 */
export class WebhookController {
  /**
   * The repository.
   *
   * @type {WebhookRepository}
   */
  #repository

  /**
   * Initializes a new instance.
   *
   * @param {WebhookRepository} repository - A service instantiated from a class with the same capabilities as UserRepository.
   */
  constructor (repository = new WebhookRepository()) {
    this.#repository = repository
  }

  /**
   * Webhhok info.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async info (req, res, next) {
    res
      .status(200)
      .json('/webhook/register to subscribe to webhooks.')
  }

  /**
   * Registers a webhook.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
    try {
      if (!req.body.url) {
        next(createError(400, 'Bad request.'))
        return
      }
      const response = await this.#repository.registerWebhook(req)

      res.status(201).json(response.url)
    } catch (error) {
      next(error)
    }
  }
}
