const path = require('path');

module.exports = function(env, argv) {
    const isProduction = argv.mode === 'production';

    return {
        devtool: !isProduction && 'cheap-module-source-map',
        mode: isProduction ? 'production' : 'development',
        entry: './src/client.ts',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'assets/js/client.js'
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'ts-loader'
                    }
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js']
        }
    };
};
