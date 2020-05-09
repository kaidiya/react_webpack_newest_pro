const auroprefixer = require('autoprefixer');
module.exports = {
  options: {
    less: {
      javascriptEnabled: true
    }
  },
  pugins: [
    auroprefixer(),
  ]
}