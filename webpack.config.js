require('dotenv-extended/config');
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  const plugins = [
    new HtmlWebpackPlugin({
      template: './client/index.html'
    })
  ];

  let devtool = 'eval-source-map';

  if (env === 'production') {
    process.env.NODE_ENV = env;
    devtool = 'source-map';
  }

  return {
    entry: {
      main: './client/index.js'
    },
    output: {
      path: resolve(__dirname, './dist/client'),
      filename: './[name].[hash].js',
      chunkFilename: './[name].[chunkhash].js'
    },
    devtool,
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.js$/,
          use: ['babel-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.(jp(e)?g|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '/[hash].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins,
    devServer: {
      port: process.env.WEBPACK_PORT,
      inline: true,
      historyApiFallback: true,
      hot: true,
      proxy: {
        '/api': {
          target: `http://localhost:${process.env.PORT}`
        },
        '/auth': {
          target: `http://localhost:${process.env.PORT}`
        },
        '/ws': {
          target: `http://localhost:${process.env.PORT}`
        }
      }
    }
  };
};