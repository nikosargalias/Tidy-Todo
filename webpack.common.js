const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        controller:'./src/_mvc_controller.js',
        controllerNote:'./src/_mvc_controller_note_edit.js',
        styles: './CSS/styles.css'
    },
    output: {
        filename: 'scripts/[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({  // Also generate a test.html
            filename: 'index.html',
            template: './index.html',
            inject: "body",
            excludeChunks: ["controllerNote"]
          }),
          new HtmlWebpackPlugin({  // Also generate a test.html
            filename: 'note-edit-page.html',
            template: './note-edit-page.html',
            inject: "body",
            excludeChunks: ["controller"]
          })
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            }
        ]
    },
};