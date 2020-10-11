// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {
      browsers: ['Android >= 4.0', 'iOS >= 7']  //   添加浏览器前缀 安卓4.0版本，ios 7.0版本以上
    },
    'postcss-pxtorem': {
      rootValue: 70,
      propList: ['*']
    
    }
  }
}
