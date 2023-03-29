/**
 * Module for the UsersService.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

// import jwt from 'jsonwebtoken'
// import { RecordModel } from '../models/record.js'
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
   * Handles the access token.
   *
   * @param {object} records - All of the records.
   * @param {object} req - Express request object.
   * @returns {object} - Returns the response object.
   */
  async getAllRecordsApi (records, req) {
    // const links = {
    //   rel: 'records',
    //   href: `${req.protocol}://${req.get('host')}${req.baseUrl}/${_id}`,
    //   method: 'GET'
    // }

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
      link: baseLinks
    }

    return response
  }
}
