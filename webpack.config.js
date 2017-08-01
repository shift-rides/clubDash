module.exports = {
  entry: './reactApp/app.jsx',
  output: {
    path: `${__dirname}/build`,
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'],
          },
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};
