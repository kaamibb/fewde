const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/[name].js',
    assetModuleFilename: 'assets/[hash][ext]',
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js',
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restaurantdb-api',
          },
        },
        {
          urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/medium/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restaurantdb-image-api',
          },
        },
      ],
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
    new MiniCssExtractPlugin({ filename: 'assets/css/[name].[contenthash].css' }),
    new WebpackPwaManifest({
      name: 'Waroeng Petualang',
      short_name: 'WarPet',
      description: 'ini merupakan website penyedia daftar restaurant terbaik',
      start_url: './index.html',
      background_color: '#FFFFFF',
      theme_color: '#EA9215',
      display: 'standalone',
      orientation: 'any',
      publicPath: './',
      filename: 'site.webmanifest',
      ios: true,
      icons: [
        {
          src: path.resolve(__dirname, 'src/public/images/logo.png'),
          size: 180,
          destination: 'assets/icons',
          ios: true,
        },
        {
          src: path.resolve(__dirname, 'src/public/images/icon/icon.png'),
          sizes: [48, 72, 96, 128, 192, 384, 512],
          destination: 'assets/icons',
          purpose: 'any maskable',
        },
      ],
    }),
    new ImageminWebpWebpackPlugin({
      config: [{
        test: /\.(jpe?g|png)/,
        options: {
          quality: 75,
        }
      }],
      overrideExtension: true,
      detailedLogs: false,
      silent: false,
      strict: true
    })
  ],
};