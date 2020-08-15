'use strict'

const svgmin = require('gulp-svgmin')
const htmlmin = require('gulp-htmlmin')

function minifySvg() {
  return svgmin({
    plugins: [
      {
        removeComments: false
      }
    ]
  })
}

function minifyHtml() {
  return htmlmin({
    collapseWhitespace: true,
    sortAttributes: true
  })
}

exports.minifySvg = minifySvg
exports.minifyHtml = minifyHtml
