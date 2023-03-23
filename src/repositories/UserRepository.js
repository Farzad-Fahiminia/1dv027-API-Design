/**
 * Module for UserRepository.
 *
 * @author Mats Loock
 * @version 2.0.0
 */

import { MongooseRepositoryBase } from './MongooseRepositoryBase.js'
import { UserModel } from '../models/user.js'

/**
 * Encapsulates a user repository.
 */
export class UserRepository extends MongooseRepositoryBase {
  /**
   * Initializes a new instance.
   *
   * @param {UserModel} [model=UserModel] - A class with the same capabilities as UserModel.
   */
  constructor (model = UserModel) {
    super(model)
  }
}
