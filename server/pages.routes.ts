import express from 'express'
import { parse as parseUrl } from 'url'
import nextapp from './nextapp'

const PagesRouter = express.Router()

/* Catch-All Pages Route */
PagesRouter.get('*', (req, res, next) => {
  if (req.originalUrl.startsWith('/graphql')) {
    next()
  }
  const url = parseUrl(req.url, true)
  nextapp.render(req, res, url.pathname || '', url.query)
})

export default PagesRouter
