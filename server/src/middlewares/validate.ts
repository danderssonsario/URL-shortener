import { AnyObjectSchema } from 'yup'
import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'
import validator from 'validator'

export const validateResource = (resourceSchema: AnyObjectSchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await resourceSchema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    next()
  } catch (err) {
    next(createHttpError(400))
  }
}

export const validateURL = (URL: string) => async (req: Request, res: Response, next: NextFunction) => {
  validator.isURL(URL) ? next() : next(createHttpError(400))
}
