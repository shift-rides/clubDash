const webpack = require('webpack')

module.exports = {
  entry: [
    './App/app.jsx'
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    path: `${__dirname}/build`,
    filename: 'app.bundle.js'
  },
  devtool: 'cheap-eval-source-map',
  devServer: {
    contentBase: './public',
    hot: true
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
