/**
 * API version 1 routes.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { router as userRouter } from './userRouter.js'
import { router as recordRouter } from './recordRouter.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({ message: 'Hooray! Welcome to version 1 of this very simple RESTful API!' }))
router.use('/user', userRouter)
router.use('/record', recordRouter)

// router.use('*', (req, res, next) => {
//   const error = new Error('Not Found')
//   error.status = 404
//   next(error)
// })
