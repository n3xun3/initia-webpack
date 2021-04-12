const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const javascriptRules = {
    test: /\.js$/ ,//cualquier archivo .js que lo busque y queremos que pase por babel loader
    exclude: /node_modules/,
    use:{
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-react'],
            plugins:['@babel/plugin-proposal-class-properties']
        }
    } 
}

const productionPlugins = [
    new CompressionPlugin(),
]

module.exports = (env, {mode}) => ({
    output: {
        filename: 'app.[contenthash].js'
    },
    module:{
        rules:[javascriptRules]
    },
    plugins: [
        mode === 'production' && new CompressionPlugin(), // si es produccin cargar este plugin nos hace el gzip 
        new HtmlWebpackPlugin({
            title: 'Webpack Paso a Paso',
            template: 'src/index.html'
        })
    ].filter(Boolean) // nos devolveras los que no sean false
})