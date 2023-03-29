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
  // /**
  //  * Handles the access token.
  //  *
  //  * @param {object} req - Express request object.
  //  * @returns {object} - Returns the response object.
  //  */
  // async signToken (req) {
  //   const user = await RecordModel.authenticate(req.body.username, req.body.password)
  //   const token = Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64')

  //   const payload = {
  //     sub: user.username,
  //     password: user.password,
  //     given_name: user.firstName,
  //     family_name: user.lastName,
  //     id: user._id
  //   }

  //   // Create the access token with the shorter lifespan.
  //   const accessToken = jwt.sign(payload, token, {
  //     algorithm: 'RS256',
  //     expiresIn: process.env.ACCESS_TOKEN_LIFE
  //   })

  //   return accessToken
  // }
}
