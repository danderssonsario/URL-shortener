import express, {Request, Response, NextFunction}  from 'express'
import createError from 'http-errors'

export const router = express.Router()

router.get('*', ((req: Request, res: Response, next: NextFunction) => next(createError(404))))