/**
 * Module for the UsersService.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import { Links } from '../util/Links.js'

/**
 * Encapsulates a service.
 */
export class RecordService {
  /**
   * The links.
   *
   * @type {Links}
   */
  #links

  /**
   * Initializes a new instance.
   *
   * @param {Links} links - A service instantiated from a class with the same capabilities as RecordRepository.
   */
  constructor (links = new Links()) {
    this.#links = links
  }

  /**
   * Handles the records api links.
   *
   * @param {object} records - All of the records.
   * @param {object} req - Express request object.
   * @returns {object} - Returns the response object.
   */
  async getAllRecordsApi (records, req) {
    const recordsCollection = []

    const baseLinks = await this.#links.getBaseLink(req)

    records.forEach((record) => {
      const link = this.#links.getLink(record, req)
      const recordObject = {
        artist: record.artist,
        recordTitle: record.recordTitle,
        releaseYear: record.releaseYear,
        recordId: record._id,
        links: link
      }
      recordsCollection.push(recordObject)
    })

    const response = {
      records: recordsCollection,
      globalLinks: baseLinks
    }

    return response
  }

  /**
   * Handles the records api links.
   *
   * @param {object} req - Express request object.
   * @param {object} record - A record.
   * @returns {object} - Returns the response object.
   */
  getRecordApi (req, record) {
    const baseLinks = this.#links.getBaseLink(req)

    const link = this.#links.getAllLinks(record, req)
    const recordObject = {
      artist: record.artist,
      recordTitle: record.recordTitle,
      releaseYear: record.releaseYear,
      recordId: record._id,
      links: link
    }

    const response = {
      record: recordObject,
      globalLinks: baseLinks
    }

    return response
  }

  /**
   * Handles the base links.
   *
   * @param {object} req - Express request object.
   * @returns {object} - Returns the response object.
   */
  async getBaseApi (req) {
    const baseLinks = await this.#links.getBaseLink(req)

    const response = {
      globalLinks: baseLinks
    }

    return response
  }
}
