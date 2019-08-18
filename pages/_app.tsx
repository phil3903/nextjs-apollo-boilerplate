import React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import { PageTransition } from 'next-page-transitions'
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from '@apollo/react-hooks'
import '../styles/reset.scss'
import '../styles/bootstrap-grid.scss'
import '../styles/todos.scss'

interface IProps {
  apolloClient: any //fix this
}

class _App extends App<IProps> {
  render() {
    const { Component, pageProps, apolloClient, router } = this.props

    return (
      <Container>
        <Head>
          <title>Apollo Next</title>
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/static/favicon/favicon-192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon/favicon-16.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon/favicon-32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon/favicon-96.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/static/favicon/apple-touch-icon-57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/static/favicon/apple-touch-icon-60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/static/favicon/apple-touch-icon-72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/static/favicon/apple-touch-icon-76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/static/favicon/apple-touch-icon-114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/static/favicon/apple-touch-icon-120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/static/favicon/apple-touch-icon-152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="167x167"
            href="/static/favicon/apple-touch-icon-167.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicon/apple-touch-icon-180.png"
          />
          <meta
            name="msapplication-TileImage"
            content="/static/favicon/ms-icon-144.png"
          />
        </Head>

        <ApolloProvider client={apolloClient}>
        <PageTransition timeout={300} classNames="page-transition">
          <Component {...pageProps} key={router.route} />
        </PageTransition>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApolloClient(_App)
