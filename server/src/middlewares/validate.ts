import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'
import yup from 'yup'

const validateResource = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = yup.object().shape({
      shortId: yup
        .string()
        .trim()
        .matches(/^[\w\-]+$/i),
      destinationUrl: yup.string().trim().url().required(),
    })

    schema.validate({ shortId: req.body.shortId, destinationUrl: req.body.destinationURL})
  } catch (err) {
    next(createHttpError(400))
  }
}

export default validateResource