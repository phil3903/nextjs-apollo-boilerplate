import 'reflect-metadata'
import express from 'express'
import cookie from 'cookie'
import { ApolloServer } from 'apollo-server-express'
import { createConnection } from 'typeorm'

import typeOrmOptions from './db.config'
import nextapp from './nextapp'
import schema from '../schemas'
import resolvers from '../resolvers'
import PagesRouter from './pages.routes'
require('dotenv-extended').load()

/* Express */
const app = express()
app.use('/', PagesRouter)

/* Server */
async function main() {
  try {
    await nextapp.prepare()
    await createConnection(typeOrmOptions)

    const apolloServer = new ApolloServer({
      typeDefs: schema,
      resolvers,
      context: ({ req }) => {
        const { authorization } = cookie.parse(req.headers.cookie || '')
        return { authorization }
      },
    })

    apolloServer.applyMiddleware({ app, path: '/graphql' })
    app.listen(process.env.PORT)
    console.log(`server listening on port ${process.env.PORT}`)
  } catch (err) {
    console.error(err)
  }
}

main()
