/**
 * The record router.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { RecordController } from '../../../controllers/api/RecordController.js'

export const router = express.Router()

const controller = new RecordController()

/**
 * Resolves a RecordController object from the IoC container.
 *
 * @param {object} req - Express request object.
 * @returns {object} An object that can act as a RecordController object.
 */
const resolveRecordController = (req) => req.app.get('container').resolve('RecordController')

// Map HTTP verbs and route paths to controller actions.
router.get('/',
  (req, res, next) => resolveRecordController(req).getAllRecords(req, res, next)
)

router.get('/:id',
  (req, res, next) => resolveRecordController(req).getRecord(req, res, next)
)

router.post('/',
  (req, res, next) => controller.authenticateJWT(req, res, next),
  (req, res, next) => resolveRecordController(req).addRecord(req, res, next)
)

router.put('/:id',
  (req, res, next) => controller.authenticateJWT(req, res, next),
  (req, res, next) => resolveRecordController(req).putRecord(req, res, next)
)

router.patch('/:id',
  (req, res, next) => controller.authenticateJWT(req, res, next),
  (req, res, next) => resolveRecordController(req).patchRecord(req, res, next)
)

router.delete('/:id',
  (req, res, next) => controller.authenticateJWT(req, res, next),
  (req, res, next) => resolveRecordController(req).deleteRecord(req, res, next)
)
