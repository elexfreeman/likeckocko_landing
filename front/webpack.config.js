const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
    VueLoaderPlugin
} = require('vue-loader');

const entry = require('./entry.js'); //файл с точками входа

module.exports = {
    mode: "development", //режим сборки
    entry: entry, //объект с точками входа
    output: {
        path: path.join(__dirname, 'build/'), //общий путь для выходных файлов
        filename: "js/[name].js" //в этом параметре мы индивидуально добавляем необходимую директорию перед именем файлов
    },

    watch: true, //Слежение за изменениями
    watchOptions: {
        ignored: /node_modules/, //исключения в слежении
        poll: 1000 //интервал обновления
    },
    devtool: "source-map", //Инструменты разработчика
    resolve: {
        alias: { //краткие имена путей для импортов
            'vue$': 'vue/dist/vue.esm.js',
            config: path.resolve(__dirname, 'src/config.js'),
            common: path.resolve(__dirname, 'src/common'),
            images: path.resolve(__dirname, 'src/common/images'),
        },
        modules: ['node_modules', 'src'], //папки доступные для сканирования
        extensions: ['.tsx', '.ts', '.js']
    },
    resolveLoader: {
        modules: ['node_modules'],
        moduleExtensions: ['-loader']
    },
    module: { //Загрузчики
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: '/(node_modules|bower_components)/',
            query: {
                presets: ['@babel/preset-env'],
                cacheDirectory: true
            }
        },
        {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    ts: 'ts-loader'
                },
                esModule: true
            }
        },
        {
            test: /\.scss$/,
            use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']

        },
        {
            test: /\.css$/,
            use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']

        },
        {
            test: /\.html$/,
            use: [{
                loader: 'html-loader',
                options: {
                    minimize: false,
                    removeComments: false,
                    collapseWhitespace: false,
                    attrs: ['img:src']
                }
            }]
        },
        {
            test: /\.(jpg|png|gif)$/,
            use: {
                loader: 'file',
                query: {
                    useRelativePath: false,
                    name: 'images/[name].[ext]'
                }
            }
        },
        {
            test: /\.(woff|woff2|eot|ttf|svg)$/,
            use: {
                loader: 'url',
                options: {
                    limit: 10000,
                    publicPath: '',
                    name: 'fonts/[name].[ext]'
                }
            }
        },
        {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            options: {
                configFile: 'tsconfig.json',
                appendTsSuffixTo: [/\.vue$/]
            }
        },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'example.html',
            template: './example.html'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ],
    optimization: { //настройки оптимизации и минификации
        flagIncludedChunks: true,
        minimize: false,
        namedModules: true,
        namedChunks: true,
        mergeDuplicateChunks: true,
        removeEmptyChunks: true,
        removeAvailableModules: true,
        splitChunks: {
            name: 'common',
            chunks: 'all',
            minChunks: 2
        },
        noEmitOnErrors: true,
        concatenateModules: true
    },
    externals: [{
        xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
    }],


};
