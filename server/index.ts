require('dotenv-extended').load()
import 'reflect-metadata'
import express from 'express'
import cookie from 'cookie'
import { ApolloServer } from 'apollo-server-express'
import { createConnection } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
//import { SqliteConnectionOptions } from 'typeorm/driver/sqlite/SqliteConnectionOptions'
import nextapp from './nextapp'

import schema from '../schemas'
import resolvers from '../resolvers'
import entities from '../models'
import PagesRouter from './pages.routes'

/* Express */
const app = express()
app.use('/', PagesRouter)

// Using my Postgres Docker container
const typeOrmOptions: PostgresConnectionOptions = {
  type: 'postgres',
  database: 'todos',
  synchronize: true,
  logging: false,
  entities,
  password: process.env.DATABASE_PASSWORD,
  username: process.env.DATABASE_USERNAME,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10)
}

// Uncomment to run locally with sqlite
// const typeOrmOptions: SqliteConnectionOptions = {
//   type: 'sqlite',
//   database: './todoes.sqlite',
//   synchronize: true,
//   logging: false,
//   entities,
// }

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

