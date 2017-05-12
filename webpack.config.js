const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');
const bootstrapEntryPoints = require('./webpack.bootstrap.config');
const PurifyCSSPlugin = require('purifycss-webpack');

const isProd = process.argv.indexOf('-p') !== -1;
let cssDev = ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?outputStyle=expanded'];
let cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
        { loader: 'css-loader', 
          options: { importLoaders: 1 }}, 
        { loader: 'postcss-loader', 
          options: { plugins: () => {
        return [
            require('autoprefixer')
        ]
    }} }, 'sass-loader'],
    publicPath: '../'
})

let cssConfig = isProd ? cssProd : cssDev;

let bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

if (module.hot)
  module.hot.accept()

module.exports = {
    entry: { 
        app: './src/index.js', 
        bootstrap: bootstrapConfig
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/, 
                use: cssConfig
            },
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: ['babel-loader']
            },
            {
                test: /\.(jpe?g|png|gif|ico)$/i,
                use: [
                'file-loader?name=images/[name].[ext]',
                'image-webpack-loader'
                ]
            },
            { 
                test: /\.(ttf|eot|woff(2)?|svg)$/, 
                loader: 'file-loader?name=fonts/[name].[ext]' 
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
            {
                test: /\.mp4$/,
                use: 'file-loader?name=video/[name].[ext]'
            },
            { 
                test: /bootstrap[\/\\]dist[\/\\]js[\/\\]umd[\/\\]/, 
                loader: 'imports-loader?jQuery=jquery' 
            },
        ]
    },
    node: {
        console: true,
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        port: 8080,
        host: "192.168.254.67",
        hot: true,
        stats: 'errors-only',
        open: true
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'VK API Application',
        minify: {
            collapseWhitespace: true
        },
        hash: true,
        template: './index.html'
    }),
    new ExtractTextPlugin({
        filename: 'css/[name].css',
        disable: !isProd,
        allChunks: true
    }),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Tether: "tether",
        "window.Tether": "tether",
        Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
        Button: "exports-loader?Button!bootstrap/js/dist/button",
        Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
        Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
        Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
        Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
        Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
        Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
        Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
        Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
        Util: "exports-loader?Util!bootstrap/js/dist/util",
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // new PurifyCSSPlugin({
    //     paths: glob.sync(path.join(__dirname, 'src/**/**/*.*')),
    //     minimize: true
    // }),
    ]
}