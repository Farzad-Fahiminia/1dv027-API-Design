/**
 * Module for the AccountController.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

// import createError from 'http-errors'
// import jwt from 'jsonwebtoken'
import createError from 'http-errors'
// import { UserModel } from '../../models/user.js'
// import { UsersService } from '../../services/UsersService.js'
import { UserRepository } from '../../repositories/UserRepository.js'

/**
 * Encapsulates a controller.
 */
export class UsersController {
  /**
   * The repository.
   *
   * @type {UserRepository}
   */
  #repository

  /**
   * Initializes a new instance.
   *
   * @param {UserRepository} repository - A service instantiated from a class with the same capabilities as UserRepository.
   */
  constructor (repository = new UserRepository()) {
    this.#repository = repository
  }

  /**
   * Authenticates a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    try {
      // console.log('LOGIN')
      // const user = await UserModel.authenticate(req.body.username, req.body.password)
      // const token = Buffer.from(process.env.ACCESS_TOKEN_SECRET, 'base64')

      // const payload = {
      //   sub: user.username,
      //   password: user.password,
      //   given_name: user.firstName,
      //   family_name: user.lastName,
      //   id: user._id
      // }

      // // Create the access token with the shorter lifespan.
      // const accessToken = jwt.sign(payload, token, {
      //   algorithm: 'RS256',
      //   expiresIn: process.env.ACCESS_TOKEN_LIFE
      // })

      const accessToken = await this.#repository.signToken(req)

      res
        .status(200)
        .json({
          access_token: accessToken
        })
    } catch (error) {
      // Authentication failed.
      const err = createError(401)
      err.cause = error

      next(err)
    }
  }

  /**
   * Registers a user.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
    try {
      // const user = new UserModel({
      //   username: req.body.username,
      //   password: req.body.password,
      //   firstName: req.body.firstName,
      //   lastName: req.body.lastName,
      //   email: req.body.email
      // })

      // console.log(req.body)

      // await user.save()

      const user = await this.#repository.registerUser(req)

      res
        .status(201)
        .json({ id: user.id })
    } catch (error) {
      let err = error

      if (err.code === 11000) {
        // Duplicated keys.
        err = createError(409)
        err.cause = error
      } else if (error.name === 'ValidationError') {
        // Validation error(s).
        err = createError(400)
        err.cause = error
      }

      next(err)
    }
  }
}
