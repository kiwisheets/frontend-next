import Head from 'next/head';

import { gql, useQuery } from '@apollo/client';
import Page from '@/components/Page';

export const VERSION_QUERY = gql`
  query version {
    version
  }
`;

function Home() {
  const { loading, error, data } = useQuery(VERSION_QUERY);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        {loading && <p>Loading...</p>}

        {error && (
          <p
            style={{
              color: 'red',
            }}
          >
            Error: {error.message}
          </p>
        )}

        {data && <p>Result: {data.version}</p>}
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <Page>
      <Home />
    </Page>
  );
}
