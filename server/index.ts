require('dotenv-extended').load({
  errorOnMissing: true,
  errorOnExtra: true,
})
import 'reflect-metadata'
import express from 'express'
import cookie from 'cookie'
import { ApolloServer } from 'apollo-server-express'
import { createConnection } from 'typeorm'
import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions'
import nextapp from './nextapp'

import schema from '../schemas'
import resolvers from '../resolvers'
import entities from '../models'
import PagesRouter from './pages.routes'

/* Express */
const app = express()
app.use('/', PagesRouter)

const typeOrmOptions: SqliteConnectionOptions = {
  type: 'sqlite',
  database: './database.sqlite',
  synchronize: true,
  logging: false,
  entities,
}

/* Server */
async function main() {
  try {
    await nextapp.prepare()
    await createConnection(typeOrmOptions)

    const apolloServer = new ApolloServer({
      typeDefs: schema,
      resolvers,
      context: ({req}) => {
        const {authorization} = cookie.parse(req.headers.cookie || '')
        return {authorization}
      }
    })

    apolloServer.applyMiddleware({ app, path: '/graphql' })
    app.listen(process.env.PORT)
    console.log(`server listening on port ${process.env.PORT}`)
  } catch (err) {
    console.error(err)
  }
}

main()

