module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue: 100,     //设计稿默认根节点字体大小为100px,屏幕像素为750px
            minPixelValue: 2,
            propList: ['*'],
            demo:''
        }
    }
}