// const webpack = require('webpack');
// const path = require('path');

// const process = require('process/browser');

// module.exports = function override(config) {


//   config.resolve = {
//     ...config.resolve,
//     fallback: {
//       ...config.resolve.fallback,
//       module: false, // 禁用 module 核心模块的 polyfill
//       process: require.resolve('process/browser'),
//       stream: require.resolve('stream-browserify'),
//       assert: require.resolve('assert/'),
//       buffer: require.resolve('buffer/'),
//     },

//     extensions: ['.mjs', '.js', '.json'],
//     alias: {
//       ...config.resolve.alias,
//       'process/browser': require.resolve('process/browser'),
//     },
//   };

//   config.output.path = path.resolve(__dirname, 'static');
//   config.plugins = (config.plugins || []).concat([
//     new webpack.ProvidePlugin({
//       process: 'process/browser',
//       Buffer: ['buffer', 'Buffer']
//     }),
//   ]);
//   return config;
// };

const webpack = require('webpack');
const path = require('path');



module.exports = function override(config) {
  config.resolve.extensions  = config.resolve.extensions.concat(['.mjs', '.js', '.json'])
  config.resolve.fallback = {
    // ...config.resolve.fallback,
    // "os": require.resolve("os-browserify/browser"),
    "process": require.resolve("process/browser"),
    stream: require.resolve('stream-browserify'),
    assert: require.resolve('assert/'),
    buffer: require.resolve('buffer/')

  };
  config.module.rules.push(      {
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false
    },
  },
);
  config.output.path = path.resolve(__dirname, 'static');
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
  }),
  ]);
  return config;
};
