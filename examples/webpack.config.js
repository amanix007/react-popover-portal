const webpack = require('webpack');
const path = require('path');

const src_path = path.join(__dirname, './src');
const dist_path = path.join(__dirname, './dist');

const pr = process.env.NODE_ENV === 'production'


// - Plugns that is used in production or development mode 

const plugins = [
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify(pr ? 'production' : 'development') }
  }),

  new webpack.NamedModulesPlugin(),
];

if (pr) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false}),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
      output: { comments: false }}));
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

// - Exporting config for webpack 

module.exports = {
  devtool: pr ? 'source-map' : 'eval',

  context: src_path,

  entry: {
    bundle: './index.js'
  },

  output: {
    path: dist_path,
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: ['file-loader?name=[name].[ext]']
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      src_path
    ]
  },

  plugins,

  devServer: {
    contentBase: './',
    historyApiFallback: true,
    port: 8080,
    compress: pr,
    inline: !pr,
    hot: !pr,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
    },
  }
};
