import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import { router } from './routes'

try {
  dotenv.config()
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use(cors())
  app.use(morgan('dev'))
  
  app.use('/', router)

  /* app.use(function (err, req, res, next) {
    err.status = err.status || 500

    if (err.status === 500) {
      err.message = 'An unexpected condition was encountered.'
    }

    return res.status(err.status).json({
      message: err.message,
    })
  }) */

  app.listen(process.env.PORT, () => {
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })

} catch (e) {
  console.error(e)
  process.exitCode = 1
}
