import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'
import validator from 'validator'

const validateURL = () => async (req: Request, res: Response, next: NextFunction) => {
  validator.isURL(req.body.destinationURL) ? next() : next(createHttpError(400))
}

export default validateURL