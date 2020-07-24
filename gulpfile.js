'use strict'

const { src, dest, watch, series, parallel } = require('gulp')

const del = require('del')

const { buildSass } = require('./config/sass')
const { postCss, injectCss } = require('./config/css')
const { minifySvg } = require('./config/svg')

function cleanDist() {
  return del([
    './dist/*'
  ])
}

function destFile() {
  const styleFile = src('./src/sass/index.scss')
  const targetFile = src('./src/profile.svg')

  const style = styleFile
    .pipe(buildSass())
    .pipe(postCss({
      minify: true
    }))

  return targetFile
    .pipe(minifySvg())
    .pipe(injectCss(style))
    .pipe(dest('./dist'))
}

function develop() {
  watch('src/**/*.(scss|svg)', series([cleanDist, destFile]))
}

exports.build = series([cleanDist, destFile])
exports.default = develop
