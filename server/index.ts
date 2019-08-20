require('dotenv-extended').load({
  errorOnMissing: true,
  errorOnExtra: true,
})
import 'reflect-metadata'
import express from 'express'
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
  database: './database.db',
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
        return {
          authorization: req.headers.authorization
        }
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


// const handleJWT = ({ req }: any) => {
//   const token = String(req.headers.token)
//   if(!token) throw new AuthenticationError('you are not logged in')

//   const user = authorizeToken(token)
//   if(!user) throw new AuthenticationError('you are not logged in')

//   return {user}
// }
// console.log(handleJWT)


