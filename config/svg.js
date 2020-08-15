'use strict'

const inject = require('gulp-inject')

/**
 * @param {NodeJS.ReadableStream} source NodeJS.ReadableStream.
 */
function injectSvg(source) {
  return inject(source, {
    removeTags: true,
    starttag: '<!-- inject:{{ext}} -->',
    transform: function (_, file) {
      return file.contents.toString('utf8')
    }
  })
}

exports.injectSvg = injectSvg
