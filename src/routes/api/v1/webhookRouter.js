/**
 * The webhook router.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'

export const router = express.Router()

/**
 * Resolves a WebhookController object from the IoC container.
 *
 * @param {object} req - Express request object.
 * @returns {object} An object that can act as a WebhookController object.
 */
const resolveWebhookController = (req) => req.app.get('container').resolve('WebhookController')

// Map HTTP verbs and route paths to controller actions.
router.get('/',
  (req, res, next) => resolveWebhookController(req).info(req, res, next)
)

router.post('/register',
  (req, res, next) => resolveWebhookController(req).register(req, res, next)
)
