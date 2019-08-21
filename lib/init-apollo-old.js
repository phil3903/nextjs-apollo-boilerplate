import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  from,
} from 'apollo-boost'
import { onError } from 'apollo-link-error'
import fetch from 'isomorphic-unfetch'
import cookie from 'cookie'
import { todoResolver } from '../components/Todos'

let apolloClient = null

// function parseCookies (req, options = {}) {
//   console.log(req)
//   return {}
//   //return cookie.parse(req ? req.headers.authorization || '' : document.cookie, options)
// }

// Create the link to the backend
const httpLink = isBrowser =>
  new HttpLink({
    uri: `http://localhost:${process.env.PORT}/graphql`, // Server URL (must be absolute)
    credentials: 'same-origin', // Additional fetch() options like `credentials` or `headers`
     // Use fetch() polyfill on the server
    connectToDevTools: process.env.NODE_ENV !== 'production',
  })

// Generic Error Handler
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

// Placeholder for JWT or other Auth Things
const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext((req) => ({
    headers: {
      //...req.headers,
      //AuthToken: parseCookies(req)
    },
  }))
  return forward(operation)
})

function create(initialState) {
  const isBrowser = typeof window !== 'undefined'
  const cache = new InMemoryCache({
    freezeResults: true,
  }).restore(initialState || {})
  const apolloClient = new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: from([authMiddleware, errorLink.concat(httpLink(isBrowser))]),
    cache,
    assumeImmutableResults: true,
    resolvers: { ...todoResolver }, //Any client side resolvers go here

    // Allows you to adjust your fetch and query policies
    // defaultOptions: {
    //   watchQuery: {
    //     fetchPolicy: 'cache-and-network',
    //     errorPolicy: 'ignore',
    //   },
    //   query: {
    //     fetchPolicy: 'network-only',
    //     errorPolicy: 'all',
    //   },
    //   mutate: {
    //     errorPolicy: 'all',
    //   },
    // }
  })

  //initial state
  cache.writeData({ data: {} })

  return apolloClient
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
