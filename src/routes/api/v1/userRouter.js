/**
 * The account router.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
// import { UsersController } from '../../../controllers/api/UsersController.js'

export const router = express.Router()

// const controller = new UsersController()

/**
 * Resolves a UserController object from the IoC container.
 *
 * @param {object} req - Express request object.
 * @returns {object} An object that can act as a TasksController object.
 */
const resolveUsersController = (req) => req.app.get('container').resolve('UsersController')

// Map HTTP verbs and route paths to controller actions.
router.post('/login',
  (req, res, next) => resolveUsersController(req).login(req, res, next)
)
// (req, res, next) => controller.login(req, res, next))

router.post('/register',
  (req, res, next) => resolveUsersController(req).register(req, res, next)
)
// (req, res, next) => controller.register(req, res, next))
