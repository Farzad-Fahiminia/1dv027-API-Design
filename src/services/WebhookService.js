/**
 * Module for the WebhookService.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import { WebhookModel } from '../models/webhook.js'

/**
 * Encapsulates a service.
 */
export class WebhookService {
  /**
   * Notify webhook users.
   *
   * @param {object} record - Record.
   */
  async emitNewRecord (record) {
    const webhookUsers = await WebhookModel.find()

    webhookUsers.forEach((webhookUser) => {
      fetch(`${webhookUser.url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(record)
      })
    })
  }
}
