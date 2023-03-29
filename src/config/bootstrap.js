/**
 * Module for bootstrapping.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import { IoCContainer } from '../util/IoCContainer.js'
import { UsersService } from '../services/UsersService.js'
import { UsersController } from '../controllers/api/UsersController.js'

const iocContainer = new IoCContainer()

iocContainer.register('UsersService', UsersService, {
  singleton: true
})

iocContainer.register('UsersController', UsersController, {
  dependencies: [
    'UsersService'
  ],
  singleton: true
})

export const container = Object.freeze(iocContainer)
