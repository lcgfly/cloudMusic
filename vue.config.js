module.exports = {
    devServer:{
        proxy:{
            '/banner':{
                target:'http://localhost:3000',
                changeOrigin:true
            }
        }
    },
    lintOnSave: false
}