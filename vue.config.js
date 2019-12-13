const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    port: 4000,
    proxy: {
      '/proxy': {
        target: 'http://localhost:7000',
        // secure: false,  // 如果是https接口，需要配置这个参数
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/proxy': ''
        }
      },
      '/socket.io': {
        target: 'http://localhost:7000',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/socket.io': '/socket.io'
        }
      }
    }
  },

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },

  chainWebpack (config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/svgs'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/svgs'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
