/**
 * Module for api links.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

/**
 * Encapsulates api links.
 */
export class Links {
  /**
   * Get all links.
   *
   * @param {object} req - Express request object.
   * @returns {object} - Returns the response object.
   */
  getAllLinks (req) {
    const links = [
      { rel: 'self', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.baseUrl}/${req._id}` },
      { rel: 'update_parts', method: 'PATCH', href: `${req.protocol}://${req.get('host')}${req.baseUrl}/${req._id}` },
      { rel: 'update_all', method: 'PUT', href: `${req.protocol}://${req.get('host')}${req.baseUrl}/${req._id}` },
      { rel: 'delete', method: 'DELETE', href: `${req.protocol}://${req.get('host')}${req.baseUrl}/${req._id}` }
    ]

    return links
  }

  /**
   * Get link.
   *
   * @param {object} record - Record object.
   * @param {object} req - Express request object.
   * @returns {object} - Returns the response object.
   */
  getLink (record, req) {
    console.log(record)
    const link = [
      { rel: 'self', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.baseUrl}/${record._id}` }
    ]

    return link
  }

  /**
   * Get base link.
   *
   * @param {object} req - Express request object.
   * @returns {object} - Returns the response object.
   */
  getBaseLink (req) {
    const userPath = '/api/v1/user'

    const baseLinks = [
      { rel: 'all_records', method: 'GET', href: `${req.protocol}://${req.get('host')}${req.baseUrl}` },
      { rel: 'add_record', method: 'POST', href: `${req.protocol}://${req.get('host')}${req.baseUrl}` },
      { rel: 'register', method: 'POST', href: `${req.protocol}://${req.get('host')}${userPath}` },
      { rel: 'login', method: 'POST', href: `${req.protocol}://${req.get('host')}${userPath}` }
    ]

    return baseLinks
  }
}
