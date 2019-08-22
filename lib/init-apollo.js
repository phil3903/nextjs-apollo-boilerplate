import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  from
} from 'apollo-boost'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import fetch from 'isomorphic-unfetch'
import { userResolver } from '../components/Users'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (typeof window === 'undefined') {
  global.fetch = fetch
}

function create(initialState, options) {
  const { headers } = options
  const isBrowser = typeof window !== 'undefined'
  const httpLink = new HttpLink({
    uri: `http://localhost:8080/graphql`,
    credentials: 'include',
    fetch: !isBrowser && fetch,
    connectToDevTools: process.env.NODE_ENV !== 'production',
    headers: {...headers}
  })

  // const authLink = setContext((_, {headers}) => {
  //   // get the authentication token from local storage if it exists
  //   //const token = localStorage.getItem('token')
  //   // return the headers to the context so httpLink can read them
    
  //   return {
  //     headers: {
  //       ...headers
  //     }
  //   }
  // })

  // const authLink = new ApolloLink((operation, forward) => {
  //   operation.setContext((_, { headers }) => {
  //     return {
  //       headers: {
  //         ...headers,
  //         authorization: document.cookie,
  //       }
  //     }
  //   })
  // })

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      )
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
      // do something with Error Modal
    }
  })

  const cache = new InMemoryCache({ freezeResults: true }).restore(
    initialState || {},
  )

  const apClient = new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: errorLink.concat(httpLink), //httpLink,
    assumeImmutableResults: true,
    cache,
    resolvers: { ...userResolver }
  })

  cache.writeData({data: {selectedUser: ''}})
  return apClient
}

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return create(initialState, options)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options)
  }

  return apolloClient
}
