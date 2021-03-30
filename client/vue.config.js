module.exports = {
    publicPath: '/',
    pages: {
        index: {
            // entry for the page
            entry: 'src/main.js',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'index.html',
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Blue Box'
        }
    },

    outputDir: './dist/',
    assetsDir: './static/',
    indexPath: './templates/index.html',

    transpileDependencies: ['vuetify']
}
