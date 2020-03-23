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
            // '/banner':{
            //     target:'http://localhost:3000',
            //     changeOrigin:true
            // },
            // '/login':{
            //     target:'http://localhost:3000',
            //     changeOrigin:true
            // },
            // '/logout':{
            //     target:'http://localhost:3000',
            //     changeOrigin:true
            // },
            // '/recommend':{
            //     target:'http://localhost:3000',
            //     changeOrigin:true
            // },
            // '/lyric':{
            //     target:'http://localhost:3000',
            //     changeOrigin:true
            // },
            // '/song':{
            //     target:'http://localhost:3000',
            //     changeOrigin:true
            // },
            // '/playlist':{
            //     target:'http://localhost:3000',
            //     changeOrigin:true
            // },
            // '/top':{
            //     target:'http://localhost:3000',
            //     changeOrigin:true
            // },
            // '/toplist':{
            //     target:'http://localhost:3000',
            //     changeOrigin:true
            // },
            // '/artists':{
            //     target:'http://localhost:3000',
            //     changeOrigin:true
            // },
            // '/artist':{
            //     target:'http://localhost:3000',
            //     changeOrigin:true
            // }

        }
    },
    lintOnSave: false
}