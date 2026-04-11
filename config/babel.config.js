const path = require('path');

module.exports = {
  presets: [
    [
      require.resolve('@babel/preset-env', {
        paths: [path.join(__dirname, '../frontend')],
      }),
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
