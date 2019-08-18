import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    users(limit: Int, page: Int): UsersResult
  }

  extend type Mutation {
    loginOrCreate(name: String!, password: String!,  photo: String): User
    updateUser(name: String, photo: String): User
    removeUser(id: ID!): User
  }

  type User {
    id: ID!
    createdDate: Date!
    updatedDate: Date!
    lastLoginDate: Date
    name: String
    photo: String
    todos: [Todo]
  }

  type UsersResult {
    payload: [User]
    totalCount: Int
    count: Int
    page: Int
    pageCount: Int
  }
`
