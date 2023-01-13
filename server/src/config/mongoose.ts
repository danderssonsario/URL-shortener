import mongoose from 'mongoose'
import 'dotenv/config'

const { connection } = mongoose

/**
 * Establishes a connection to a database.
 *
 * @returns {Promise} - That resolves on a successfull connection.
 */
export const connectDB = async (): Promise<any> => {
  // Connection events
  connection.on('connected', () => console.log('MongoDB: Connected.'))
  connection.on('error', (err: Error) => console.log(`MongoDB: Error: ${err}`))
  connection.on('disconnected', () => console.log('MongoDB: Disconnected.'))

  // Close connection on Node.js closure
  process.on('SIGINT', () => {
    connection.close(() => {
      console.log('Application terminated, MongoDB disconnected.')
      process.exit(0)
    })
  })

  mongoose.set('strictQuery', true)
  // Connect DB to server.
  return mongoose.connect(process.env.DB_CONNECTION_STRING || '')
}