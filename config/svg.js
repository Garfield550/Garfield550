'use strict'

const svgmin = require('gulp-svgmin')

function minifySvg() {
  return svgmin({
    plugins: [{
      removeComments: false
    }]
  })
}

exports.minifySvg = minifySvg
