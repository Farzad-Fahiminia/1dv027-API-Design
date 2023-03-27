/**
 * The account router.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { UserController } from '../../../controllers/api/UserController.js'

export const router = express.Router()

const controller = new UserController()

// Map HTTP verbs and route paths to controller actions.
router.post('/login',
  (req, res, next) => controller.login(req, res, next))

router.post('/register',
  (req, res, next) => controller.register(req, res, next))
