import express, {Request, Response, NextFunction}  from 'express'
import createError from 'http-errors'
import { URLController } from '../controllers'
import validateURL from '../middlewares/validate'

export const router = express.Router()

const controller = new URLController()

router.post('/create', validateURL, controller.create)
router.get('/:slug', controller.redirect)
router.get('/:id', controller.getOne)
router.put('/:id', controller.edit)
router.delete('/:id', controller.delete)

// Any other route
router.get('*', ((req: Request, res: Response, next: NextFunction) => next(createError(404))))