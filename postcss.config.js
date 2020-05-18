module.exports = {
    plugins: {
        'postcss-pxtorem': {
            rootValue: 50,     //设计稿默认根节点字体大小为50px,屏幕像素为375px
            minPixelValue: 2,
            propList: ['*','!filter'],
            selectorBlackList:[/^html$/]
        }
    }
}