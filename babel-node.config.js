module.exports = {
  presets: [
    '@babel/react',
    [
      '@babel/env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    [
      '@babel/plugin-proposal-private-methods',
      {
        loose: true,
      },
    ],
    ['@babel/plugin-proposal-optional-chaining']
  ],
};
