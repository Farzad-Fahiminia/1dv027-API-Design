/**
 * Mongoose model Record.
 *
 * @author Farzad Fahiminia <ff222cb@student.lnu.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'

// Create a schema.
const schema = new mongoose.Schema({
  artist: {
    type: String,
    required: [true, 'Artist is required.'],
    trim: true
  },
  recordTitle: {
    type: String,
    required: [true, 'Title is required.']
  },
  releaseYear: {
    type: Number,
    required: [true, 'Release year is required.'],
    trim: true
  },
  userId: {
    type: String,
    required: true,
    immutable: true
  }
}, {
  timestamps: true,
  toJSON: {
    /**
     * Performs a transformation of the resulting object to remove sensitive information.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object representation which has been converted.
     */
    transform: function (doc, ret) {
      delete ret._id
      delete ret.__v
    },
    virtuals: true // ensure virtual fields are serialized
  }
})

schema.virtual('id').get(function () {
  return this._id.toHexString()
})

// Create a model using the schema.
export const RecordModel = mongoose.model('Record', schema)
