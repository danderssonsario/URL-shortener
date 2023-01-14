import mongoose, { Document } from 'mongoose'
import { generateString } from '../util/alphanumeric'

export interface URL extends Document {
  shortURL: string,
  destinationURL: string
}

interface retObject extends Object {
  _id?: string,
  __v?: number
}

const schema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      unique: true,
      required: true,
      default: generateString(5)
    },
    destinationURL: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      /**
       * Filter document.
       *
       * @param {object} ret - The object representation of the model.
       */
      transform: function (ret: retObject) {
        delete ret._id
        delete ret.__v
      },
    },
  }
)

schema.virtual('id').get(function () {
  return this._id.toHexString()
})

export default mongoose.model<URL>('ShortURL', schema)