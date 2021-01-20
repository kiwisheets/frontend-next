import Head from 'next/head';

import { gql, useQuery } from '@apollo/client';

export const VERSION_QUERY = gql`
  query version {
    version
  }
`;

export default function Home() {
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
