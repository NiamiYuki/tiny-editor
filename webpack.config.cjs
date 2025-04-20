const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'node_modules/tinymce/plugins', to: 'plugins' },
        { from: 'node_modules/tinymce/themes', to: 'themes' },
        { from: 'node_modules/tinymce/icons', to: 'icons' },
        { from: 'node_modules/tinymce/skins', to: 'skins' },
        { from: 'node_modules/tinymce/models', to: 'models' }
      ]
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    port: 3000,
    open: true,
    hot: true
  },
  resolve: {
    extensions: ['.js']
  }
};
