/**
 * Module for Authentication middleware.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

// import createError from 'http-errors'
// import jwt from 'jsonwebtoken'
// import createError from 'http-errors'
// import { UserModel } from '../../models/user.js'

/**
 * Encapsulates a controller.
 */
export class Authentication {
  // /**
  //  * Authenticates a user.
  //  *
  //  * @param {object} req - Express request object.
  //  * @param {object} res - Express response object.
  //  * @param {Function} next - Express next middleware function.
  //  */
  // async verifyJwt (req, res, next) {
  //   try {

  //     const token = Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64')

  //     const payload = {
  //       sub: user.username,
  //       given_name: user.firstName,
  //       family_name: user.lastName,
  //       email: user.email,
  //       id: user._id
  //     }

  //     // Create the access token with the shorter lifespan.
  //     const accessToken = jwt.sign(payload, token, {
  //       algorithm: 'RS256',
  //       expiresIn: process.env.ACCESS_TOKEN_LIFE
  //     })

  //     next()
  //   } catch (error) {
  //     // Authentication failed.
  //     const err = createError(401)
  //     err.cause = error

  //     next(err)
  //   }
  // }
}
