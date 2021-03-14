const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        controller: {
            import: './src/_mvc_controller.js',
        },
        controllerNote: {
            import: './src/_mvc_controller_note_edit.js',
        }
    },
    output: {
        filename: '[name].[contenthash].js',
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