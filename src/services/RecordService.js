/**
 * Module for the UsersService.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

// import jwt from 'jsonwebtoken'
// import { RecordModel } from '../models/record.js'

/**
 * Encapsulates a service.
 */
export class RecordService {
  /**
   * Handles the access token.
   *
   * @param {object} records - All of the records.
   * @param {object} req - Express request object.
   * @returns {object} - Returns the response object.
   */
  async getAllRecordsApi (records, req) {
    // console.log(records)

    // const links = {
    //   rel: 'records',
    //   href: `${req.protocol}://${req.get('host')}${req.baseUrl}/${_id}`,
    //   method: 'GET'
    // }

    const recordsCollection = []

    records.forEach((record) => {
      const recordObject = {
        artist: record.artist,
        recordTitle: record.recordTitle,
        releaseYear: record.releaseYear,
        recordId: record._id,
        links: [{
          rel: 'self',
          method: 'GET',
          href: `${req.protocol}://${req.get('host')}${req.baseUrl}/${record._id}`
        }]
      }
      recordsCollection.push(recordObject)
    })

    const response = {
      records: recordsCollection
    }

    return response
  }
}
