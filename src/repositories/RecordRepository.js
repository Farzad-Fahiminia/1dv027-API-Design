/**
 * Module for RecordRepository.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

// import jwt from 'jsonwebtoken'
import { RecordModel } from '../models/record.js'
import { RecordService } from '../services/RecordService.js'

/**
 * Encapsulates a record repository.
 */
export class RecordRepository {
/**
 * The record.
 *
 * @type {RecordService}
 */
  #service

  /**
   * Initializes a new instance.
   *
   * @param {RecordService} service - A service instantiated from a class with the same capabilities as RecordService.
   */
  constructor (service = new RecordService()) {
    this.#service = service
  }

  /**
   * Get all records.
   *
   * @returns {object} - Returns the response object.
   */
  async getAllRecords () {
    const records = await RecordModel.find()

    return records
  }

  /**
   * Get record.
   *
   * @param {object} req - Express request object.
   * @returns {object} - Returns the response object.
   */
  async getRecord (req) {
    const record = await RecordModel.findById(req.params.id)

    return record
  }

  /**
   * Post record.
   *
   * @param {object} req - Express request object.
   * @returns {object} - Returns the response object.
   */
  async addRecord (req) {
    const record = new RecordModel({
      artist: req.body.artist,
      recordTitle: req.body.recordTitle,
      releaseYear: req.body.releaseYear,
      uri: req.body.uri,
      userId: req.user.id
    })

    await record.save()

    return record
  }

  /**
   * Put record.
   *
   * @param {object} req - Express request object.
   * @returns {object} - Returns the response object.
   */
  async putRecord (req) {
    const recordObject = {
      artist: req.body.artist,
      recordTitle: req.body.recordTitle,
      releaseYear: req.body.releaseYear,
      uri: req.body.uri,
      userId: req.user.id
    }

    const newRecordData = await RecordModel.findOneAndReplace({ _id: req.params.id }, recordObject, { runValidators: true })

    await newRecordData.save()

    return newRecordData
  }

  /**
   * Patch record.
   *
   * @param {object} req - Express request object.
   * @returns {object} - Returns the response object.
   */
  async patchRecord (req) {
    const recordObj = {
      artist: req.body.artist,
      recordTitle: req.body.recordTitle,
      releaseYear: req.body.releaseYear,
      uri: req.body.uri
    }

    const newRecordData = await RecordModel.findByIdAndUpdate(req.params.id, recordObj, { runValidators: true })

    await newRecordData.save()

    return newRecordData
  }

  /**
   * Delete record.
   *
   * @param {object} record - Record to be deleted
   */
  async deleteRecord (record) {
    await RecordModel.findByIdAndDelete(record)
  }
}
