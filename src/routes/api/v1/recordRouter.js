/**
 * The account router.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { RecordController } from '../../../controllers/api/RecordController.js'

export const router = express.Router()

const controller = new RecordController()

// Map HTTP verbs and route paths to controller actions.
router.get('/',
  (req, res, next) => controller.getAllRecords(req, res, next))

router.get('/:id',
  (req, res, next) => controller.getRecord(req, res, next))

router.post('/',
  (req, res, next) => controller.authenticateJWT(req, res, next),
  (req, res, next) => controller.addRecord(req, res, next))

router.put('/:id',
  (req, res, next) => controller.authenticateJWT(req, res, next),
  (req, res, next) => controller.putRecord(req, res, next))

router.patch('/:id',
  (req, res, next) => controller.authenticateJWT(req, res, next),
  (req, res, next) => controller.patchRecord(req, res, next))

router.delete('/:id',
  (req, res, next) => controller.authenticateJWT(req, res, next),
  (req, res, next) => controller.deleteRecord(req, res, next))
