/**
 * Module for bootstrapping.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import { IoCContainer } from '../util/IoCContainer.js'
import { WebhookRepository } from '../repositories/WebhookRepository.js'
import { RecordRepository } from '../repositories/RecordRepository.js'
import { UserRepository } from '../repositories/UserRepository.js'
import { WebhookController } from '../controllers/api/WebhookController.js'
import { RecordController } from '../controllers/api/RecordController.js'
import { UsersController } from '../controllers/api/UsersController.js'

const iocContainer = new IoCContainer()

iocContainer.register('WebhookRepository', WebhookRepository, {
  singleton: true
})

iocContainer.register('WebhookController', WebhookController, {
  dependencies: [
    'WebhookRepository'
  ],
  singleton: true
})

iocContainer.register('RecordRepository', RecordRepository, {
  singleton: true
})

iocContainer.register('RecordController', RecordController, {
  dependencies: [
    'RecordRepository'
  ],
  singleton: true
})

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
