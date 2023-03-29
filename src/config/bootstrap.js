/**
 * Module for bootstrapping.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import { IoCContainer } from '../util/IoCContainer.js'
// import { UsersService } from '../services/UsersService.js'
import { UserRepository } from '../repositories/UserRepository.js'
import { UsersController } from '../controllers/api/UsersController.js'

const iocContainer = new IoCContainer()

iocContainer.register('UserRepository', UserRepository, {
  singleton: true
})

iocContainer.register('UsersController', UsersController, {
  dependencies: [
    'UserRepository'
  ],
  singleton: true
})

export const container = Object.freeze(iocContainer)
