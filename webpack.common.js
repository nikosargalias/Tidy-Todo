module.exports = {
    entry: {
        controller:'./src/_mvc_controller.js',
        controllerNote:'./src/_mvc_controller_note_edit.js',
        styles: './CSS/styles.css'
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            }
        ]
    },
};