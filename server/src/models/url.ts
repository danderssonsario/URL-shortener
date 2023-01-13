import mongoose, { Document } from 'mongoose'
import { generateString } from '../util/alphanumeric'

export interface URL extends Document {
  shortURL: string,
  destinationURL: string
}

const schema = new mongoose.Schema({
  shortId: {
    type: String,
    unique: true,
    required: true,
    default: generateString(5)
  },
  destinationURL: {
    type: String,
    required: true
  }
})