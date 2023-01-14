import express, {Request, Response, NextFunction}  from 'express'
import createError from 'http-errors'
import { URLController } from '../controllers'
import {validateURL, validateResource} from '../middlewares/validate'

export const router = express.Router()

const controller = new URLController()

router.post('/create', validateResource, validateURL, controller.create)
router.get('*', ((req: Request, res: Response, next: NextFunction) => next(createError(404))))