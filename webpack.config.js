import path from "path";
import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";


export default (DEBUG, PATH, PORT=9000) => ({
  entry: (DEBUG
    ? [
      `webpack-dev-server/client?http://localhost:${PORT}`,
      'webpack/hot/dev-server',
    ]
    : [
    ])
    .concat([
      './src/theme/theme.less',
      'babel/polyfill',
      'whatwg-fetch',
      './src/main'
    ]),

  output: {
    path: path.resolve(__dirname, PATH, "generated"),
    filename: "main.js",
    publicPath: "/generated/"
  },

  cache: DEBUG,
  debug: DEBUG,

  // For options, see http://webpack.github.io/docs/configuration.html#devtool
  devtool: DEBUG && "eval-source-map",

  module: {
    loaders: [
      // Load ES6/JSX
      { test: /\.jsx?$/,
        include: [path.join(__dirname, "src"), path.join(__dirname, "config")],
        loader: "babel-loader" },

      // Load styles
      { test: /\.less$/,
        loader: DEBUG
          ? "style!css!autoprefixer!less"
          : ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader") },

      // Load images
      { test: /\.jpg/, loader: "url-loader?limit=10000&mimetype=image/jpg" },
      { test: /\.gif/, loader: "url-loader?limit=10000&mimetype=image/gif" },
      { test: /\.png/, loader: "url-loader?limit=10000&mimetype=image/png" },
      { test: /\.svg/, loader: "url-loader?limit=10000&mimetype=image/svg" },

      // Load fonts
      { test: /\.woff$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)$/, loader: "file-loader" }
    ]
  },

  plugins: DEBUG
    ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
    : [
      new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
      new ExtractTextPlugin("style.css", {allChunks: false}),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {screw_ie8: true, keep_fnames: true, warnings: false},
        mangle: {screw_ie8: true, keep_fnames: true}
      }),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin()
    ],

  resolve: {
    modulesDirectories: [
      "node_modules",

      // https://github.com/webpack/webpack-dev-server/issues/60
      "web_modules"
    ],

    alias: {
      environment: DEBUG
        ? path.resolve(__dirname, 'config', 'development.js')
        : path.resolve(__dirname, 'config', 'production.js')
    },

    // Allow to omit extensions when requiring these files
    extensions: ["", ".js", ".jsx", ".es6"]
  }
});
