import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'
import mongoose from 'mongoose'
import ShortURL from '../models/url'

export class URLController {

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { destinationURL, slug } = req.body

      const shortURL = new ShortURL({ destinationURL, slug })
      await shortURL.save()

      const location = new URL(`${req.protocol}://${req.get('host')}${req.baseUrl}/${shortURL.id}`)
      res.status(201).location(location.href).json(shortURL)
    } catch (err) {
      next(err)
    }
  }

  async redirect(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params

      const shortURL = await ShortURL.findOne({ slug })

      if (!shortURL) next(createHttpError(404))

      res.status(204).redirect(shortURL?.destinationURL as string)
    } catch (err) {
      next(err)
    }
  }

  async getOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      
      const shortURL = await ShortURL.findById(id)

      if (!shortURL) next(createHttpError(404))

      res.status(200).json(shortURL)
    } catch (err) {
      next(err)
    }
  }

    async edit(req: Request, res: Response, next: NextFunction) {
      try {
        const { id } = req.params

        const editedShortURL = await ShortURL.findByIdAndUpdate(id, req.body, { new:true })
        
        if (!editedShortURL) next(createHttpError(404))

        res.status(204).json(editedShortURL)
      } catch (err) {
        next(err)
      }
    }
  
    async delete(req: Request, res: Response, next: NextFunction) {
      try {
        const { id } = req.params

        await ShortURL.findByIdAndDelete(id)

        res.status(204).end()
      } catch (err) {
        next(err)
      }
    }
}
