/**
 * Module for WebhookRepository.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import { WebhookModel } from '../models/webhook.js'

/**
 * Encapsulates a webhook repository.
 */
export class WebhookRepository {
  /**
   * Registers the webhook.
   *
   * @param {object} req - Express request object.
   * @returns {object} - Returns the response object.
   */
  async registerWebhook (req) {
    const webhook = new WebhookModel({
      url: req.body.url
    })

    await webhook.save()

    return webhook
  }

  /**
   * Registers the webhook.
   *
   * @returns {object} - Returns the response object.
   */
  async getAllWebhookUsers () {
    const webhookUsers = await WebhookModel.find()

    return webhookUsers
  }
}
