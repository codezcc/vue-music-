var express = require('express')
var axios = require('axios')
var app = express()
var apiRoutes = express.Router()
app.use('/api', apiRoutes);

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'common': '@/common',
        'components': '@/components',
        'assets': '@/assets',
        'api': '@/api',
        'views': '@/views'
      }
    }
  },

  // 配置,解决host、referer限制问题
  devServer: {
    //添加一个before方法
    before(apiRoutes) {
      apiRoutes.get('/getDiscList', (req, res) => { //将对本api请求进行转发
        const url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'; //转发的目的url
        axios.get(url, {
          headers: {
            referer: 'https://c.y.qq.com/',
            host: 'c.y.qq.com'
          },
          params: req.query //请求的query
        }).then((response) => {
          //response是api地址返回的，数据在data里。
          res.json(response.data)
        }).catch((e) => {
          console.log(e);
        })
      });

    }
  }
}