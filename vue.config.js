module.exports = {
    publicPath: '/dist1/',
    devServer: {
        proxy: {
            '/api': {
                target:'http://123.56.89.169:9000/project/',
                changeOrigin:true,
                pathRewrite:{
                    '^/api': ''
                }
            }
            // '/api': {
            //     target:'http://123.56.89.169:3546/2021/01/10/',
            //     changeOrigin:true,
            //     pathRewrite:{
            //         '^/api': 'api'
            //     }
            // }
        }
    }
}