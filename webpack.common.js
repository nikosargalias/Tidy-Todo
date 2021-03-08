const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        controller: './src/_mvc_controller.js',
        controllerNote: './src/_mvc_controller_note_edit.js',
        logic: './src/_mvc_logic.js',
        view: './src/_mvc_view.js',
        localStorage: './src/localStorage.js',
        noteClass: './src/noteClass.js',
    },
    output: {
        filename: '[name].bundle.[hashname].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({  // Also generate a test.html
            filename: 'index.html',
            template: './index.html',
            minify: false,
            inject: "body",
            excludeChunks: ["controllerNote"]
          }),
          new HtmlWebpackPlugin({  // Also generate a test.html
            filename: 'note-edit-page.html',
            template: './note-edit-page.html',
            minify: false,
            inject: "body",
            excludeChunks: ["controller"]
          })
    ],
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
        ]
    }
};