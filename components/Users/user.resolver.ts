import {gql, InMemoryCache} from 'apollo-boost'
import { IUser } from '../../models/user.model'

const GET_ACTIVE_USER = gql`
  query GetActiveUser {
    activeUser @client
  }
`

interface ActiveUserResults {
  activeUser: string
}

const userResolver = {
  Mutation:{
    setActiveUser: (
      _:any, 
      {id}: {id: string}, 
      {cache}: {cache: InMemoryCache}
    ) =>{

      cache.writeData({
        data: {
          activeUser: id
        }
      })
      return null
    }
  },
  User: {
    isActive: (user: IUser, _variables:any,  {cache}:{cache: InMemoryCache}) =>{
      const activeUser = cache.readQuery<ActiveUserResults>({query: GET_ACTIVE_USER})!.activeUser
      return activeUser === user.id
    }
  },
}

export default userResolver