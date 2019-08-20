
import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from 'apollo-boost'
import fetch from 'isomorphic-unfetch'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (typeof window === 'undefined') {
  global.fetch = fetch
}

function create (initialState, options){    //{ getToken, fetchOptions }) { 
  const isBrowser = typeof window !== 'undefined'
  const httpLink = new HttpLink({
    uri: `http://localhost:8080/graphql`,
    credentials: 'same-origin',
    fetch: !isBrowser && fetch,
    connectToDevTools: process.env.NODE_ENV !== 'production',
  })

  // const authLink = new ApolloLink((operation, forward) => {
  //   operation.setContext((req) => {
  //     console.log(req)
  //     //const token = getToken()
  //   })
  // })

  const cache = new InMemoryCache({freezeResults: true})
    .restore(initialState || {})

  return new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: httpLink, //link: authLink.concat(httpLink),
    assumeImmutableResults: true,
    cache,
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
}

export default function initApollo (initialState, options) {
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