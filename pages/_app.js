import { ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '@/lib/apolloClient';

import Page from '@/components/Page';

import 'typeface-roboto';

import theme from '@/lib/theme';

export default function MyApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Page>
          <Component {...pageProps} />
        </Page>
      </ThemeProvider>
    </ApolloProvider>
  );
}
