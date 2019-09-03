import { gql, InMemoryCache } from 'apollo-boost'
import { IUser } from '../../models/user.model'

const GET_SELECTED_USER = gql`
  query GetSelectedUser {
    selectedUser @client
  }
`

interface ActiveUserResults {
  selectedUser: string
}

const userResolver = {
  Mutation: {
    setSelectedUser: (
      _: any,
      { name }: { name: string },
      { cache }: { cache: InMemoryCache },
    ) => {
      cache.writeData({ data: { selectedUser: name } })
      return null
    },
  },
  User: {
    isSelected: (
      user: IUser,
      _variables: any,
      { cache }: { cache: InMemoryCache },
    ) => {
      const selectedUser = cache.readQuery<ActiveUserResults>({
        query: GET_SELECTED_USER,
      })!.selectedUser
      return selectedUser === user.name
    },
  },
}

export default userResolver
