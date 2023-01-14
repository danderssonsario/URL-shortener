import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'
import ShortURL from '../models/url'

export class URLController {
  
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { destinationURL } = req.body

      const shortURL = new ShortURL({ destinationURL })
      await shortURL.save()

      const location = new URL(`${req.protocol}://${req.get('host')}${req.baseUrl}/${shortURL.id}`)
      res.status(201).location(location.href).json(shortURL)
    } catch (err) {
      next(err)
    }
  }
}
