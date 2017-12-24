//引入两个模块在后面用，path用来解析路径，webpack用来使用内置的一些模块
var path = require('path')
var webpack = require('webpack')

module.exports = {
    //入口文件，这个很重要
    entry: './index.js',
    //输出文件，当入口文件有多个，并且分别打包，filename使用[name].js,这样就可以根据入口文件名字给输出文件命名
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    //这里主要是各种loader的配置，webpack只能解析js，所以对于其他中类的文件就需要各种loader来解析，但是也很方便。
    //test中是正则表达式，用来匹配不同的文件，loader就是解析相关文件所需要的解析器，option是一些其他选项

    module: {
        rules: [
            // {
            //     test: /\.vue$/,
            //     loader: 'vue-loader',
            //     options: {}
            // },
            {
                //对于css最好style-loader和css-loader都写上，还要注意书写顺序，关系到解析顺序，尤其是使用sass和less，webpack是从右到左加载loader的。
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            }, {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader',
                exclude: /node_modules/
            }, {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/

            }, {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    //这里打包后可以把所有的字体库都放在fonts文件夹中
                    name: 'fonts/[hash].[ext]'
                }
            }]
    },
    resolve: {
        alias: {
            //这里是关于vue，官方下载的模板是vue/dist/vue.common.js,但是使用vue-router用到了template，所以记得更改
            'vue$': 'vue/dist/vue.js'
        }
    },
    //这里是关于热加载的配置
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    //这里是表示打包时使用source-map，打包之后调试会直接跳到source-map中，再也不用看压缩代码。
    devtool: '#eval-source-map'
};