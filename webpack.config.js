var webpack = require('webpack'),
  path = require('path');

module.exports = {
  devtool: 'eval-source-map',

  // webpack-dev-server options
  devServer: {
    contentBase: './app',
    colors: true,
    noInfo: true, //  --no-info option
    // host: '',
    port: 3000,
    hot: true,
    inline: true
  },

  context: __dirname,

  entry: {
    main: [/*'webpack/hot/dev-server',*/ 'babel-polyfill', './app/src/main.js'],
    "drag-and-drop": [/*'webpack/hot/dev-server',*/ 'babel-polyfill', './app/src/drag-and-drop.js'],
    "auto-complete": [/*'webpack/hot/dev-server',*/ 'babel-polyfill', './app/src/auto-complete.js'],
    "observables": [/*'webpack/hot/dev-server',*/ 'babel-polyfill', './app/src/observables.js'],
  },

  output: {
    path: __dirname + '/app/build',
    filename: "[name].js"
  },

  module: {
    loaders: [
      {test: /\.css$/, loader: "style!css"},

      {test: /\.jsx?$/, loaders: ['react-hot', 'babel'], exclude: /(node_modules|bower_components)/}

      /*
       {
       test: /\.js$/,
       exclude: /(node_modules|bower_components)/,
       loader: 'babel-loader'
       },
       {
       test: /\.js$/,
       exclude: /(node_modules|bower_components)/,
       loader: 'react-hot'
       }
       */
    ]
  },

  plugins: [
    // new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.HotModuleReplacementPlugin(),

    // uglify
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        drop_console: false,
        warnings: false
      },
      sourceMap: false,
      mangle: false // true
    })
  ],

  resolve: {
    // you can now require('file') instead of require('file.coffee')
    extension: ['', '.js', '.json', '.coffee']
  }
};