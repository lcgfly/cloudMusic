module.exports = {
    devServer:{
        proxy:{
            '/banner':{
                target:'http://localhost:3000',
                changeOrigin:true
            },
            '/login':{
                target:'http://localhost:3000',
                changeOrigin:true
            },
            '/logout':{
                target:'http://localhost:3000',
                changeOrigin:true
            },
            '/recommend':{
                target:'http://localhost:3000',
                changeOrigin:true
            },
            '/lyric':{
                target:'http://localhost:3000',
                changeOrigin:true
            },
            '/song':{
                target:'http://localhost:3000',
                changeOrigin:true
            }

        }
    },
    lintOnSave: false
}