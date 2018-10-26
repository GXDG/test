module.exports = {

    outputDir: 'dist',
    devServer: {

        // 设置主机地址
        host: 'localhost',
        // 设置默认端口
        port: 8016,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }

            }
        }
    },
}