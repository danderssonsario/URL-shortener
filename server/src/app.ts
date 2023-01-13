import express, { Request, Response, NextFunction} from 'express'
import cors from 'cors'
import morgan from 'morgan'
import 'dotenv/config'
import { router } from './routes'
import { connectDB } from './config/mongoose'

interface ResponseError extends Error {
  status?: number
}

try {
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use(cors())
  app.use(morgan('dev'))
  
  app.use('/', router)

  app.use(function (err: ResponseError, req: Request, res: Response, next: NextFunction) {
    err.status = err.status || 500

    if (err.status === 500) {
      err.message = 'An unexpected condition was encountered.'
    }

    return res.status(err.status).json({
      message: err.message,
    })
  })

  app.listen(process.env.PORT, async () => {
    await connectDB() 
    console.log(`Server running at http://localhost:${process.env.PORT}`)
    console.log('Press Ctrl-C to terminate...')
  })

} catch (e) {
  console.error(e)
  process.exitCode = 1
}
