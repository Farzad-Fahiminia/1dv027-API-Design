/**
 * Module for the WebhookService.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import fetch from 'node-fetch'
import { WebhookRepository } from '../repositories/WebhookRepository.js'

/**
 * Encapsulates a service.
 */
export class WebhookService {
  /**
   * The repository.
   *
   * @type {WebhookRepository}
   */
  #repository

  /**
   * Initializes a new instance.
   *
   * @param {WebhookRepository} repository - A repository instantiated from a class with the same capabilities as WebhookRepository.
   */
  constructor (repository = new WebhookRepository()) {
    this.#repository = repository
  }

  /**
   * Notify webhook users.
   *
   * @param {object} record - Record.
   */
  async emitNewRecord (record) {
    const webhookUsers = await this.#repository.getAllWebhookUsers()

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
