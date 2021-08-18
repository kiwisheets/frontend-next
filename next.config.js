const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'tx', 'tsx', 'mdx', 'md'],
  env: {
    GRAPHQL_URI: 'https://api-dev.kiwisheets.com/graphql',
  },
  webpack5: true,
});
