import express, {Request, Response, NextFunction}  from 'express'
import createError from 'http-errors'
import { URLController } from '../controllers'
import validateURL from '../middlewares/validate'

export const router = express.Router()

const controller = new URLController()

router.post('/create', validateURL, controller.create)
router.get('/:shortId', controller.redirect)
router.get('*', ((req: Request, res: Response, next: NextFunction) => next(createError(404))))