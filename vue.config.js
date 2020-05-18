module.exports = {
    publicPath:'./',
    assetsDir:'assets',
    devServer:{
        proxy:{
            '/api': {
                target: 'http://localhost:3000', 
                changeOrigin: true,
                pathRewrite: {
                  '^/api': '' // 这是一个通配符，设置完了之后每个接口都要在前面加上/api（特别注意这一点）
                }
              }
        }
    },
    chainWebpack:config=>{
      config.module
        .rule('images')
        .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({ bypassOnDebug: true })
        .end()
    },
    lintOnSave: false,
    productionSourceMap: false  //打包后不生成sourcemap文件
}