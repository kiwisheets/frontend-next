const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx', 'md'],
  env: {
    GRAPHQL_URI: 'https://api-dev.kiwisheets.com/graphql',
  },
});
