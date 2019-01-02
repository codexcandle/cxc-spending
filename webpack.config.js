var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var package = require('./package.json');
var webpack = require('webpack');

function isExternal(module) {
    var context = module.context;
  
    if (typeof context !== 'string') {
      return false;
    }
  
    return context.indexOf('node_modules') !== -1;
  }

module.exports = {
    entry: {
        app: './src/scripts/app.js',
        // vendor: Object.keys(package.dependencies)
      },
      output: {
        filename: "./[name].bundle.js" 
    },

    

    optimization: {
        splitChunks: {
          cacheGroups: {
            commons: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all'
            }
          }
        }
      },




    watch:true,
    resolve: { extensions: [".js", ".ts"] },
    plugins: [
        new ExtractTextPlugin({filename:'app.bundle.css'}),

        /*
        new CommonsChunkPlugin({
            name: 'vendors',
            minChunks: function(module) {
              return isExternal(module);
            }
          }),
          */



         new webpack.ProvidePlugin({
            d3: 'd3',
            d3pie: 'd3pie'
            // $: 'jquery'
        }),


        new HtmlWebpackPlugin({
            hash: true,
            title: 'Spending by Codebycandle',
            myPageHeader: 'SUPA TEST',
            template: './src/index.html',
            filename: './index.html' //relative to root of the application
        })



    ],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ["@babel/plugin-proposal-class-properties"]
                    }

/*
                    options: {
                        presets: [
                            ['env', {
                                targets: {
                                    chrome: 52
                                }
                            }]
                        ]
                    }
*/


                }
            },
            {
                test:/\.(s*)css$/, 
                use: ExtractTextPlugin.extract({ 
                        fallback:'style-loader',
                        use:['css-loader'/*,'sass-loader'*/],
                    })
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,  
                use: [{
                    loader: 'url-loader',
                    options: { 
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    } 
                }]
            }
        ]
    }
};










