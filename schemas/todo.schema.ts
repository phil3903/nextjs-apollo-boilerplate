import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    todo(id: ID!): Todo
    todos(limit: Int, page: Int): TodosResult
  }

  extend type Mutation {
    createTodo(isComplete: Boolean, dueDate: Date!, title: String!, description: String!): Todo
    updateTodo(id: ID!, isComplete: Boolean, dueDate: Date, title: String, description: String): Todo
    removeTodo(id: ID!): Todo
  }

  type Todo {
    id: ID!
    createdDate: Date!
    updatedDate: Date!
    isComplete: Boolean
    dueDate: Date!
    title: String!
    description: String!
  }

  type TodosResult {
    payload: [Todo]
    totalCount: Int
    count: Int
    page: Int
    pageCount: Int
  }
`
