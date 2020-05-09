class CopyRightWebpackPlugin {
  constructor(options) {
    console.log('插件传入的一些参数', options);
  }

  apply(compiler) {
    // 同步的hooks
    compiler.hooks.compile.tap('CopyRightWebpackPlugin', (compilation) => {
      console.log('同步的compile');
    })
    // 异步的hooks
    compiler.hooks.emit.tapAsync('CopyRightWebpackPlugin', (compilation, cb) => {
      // console.log('compiler里的hooks里的compilation对象中的内容', compilation);
      debugger;
      compilation.assets['copyright.txt'] = {
        source: function() {
          return 'copyright by linhan';
        },
        size: function() {
          return 19;
        }
      }
      cb();
    })
  }
}

module.exports = CopyRightWebpackPlugin;