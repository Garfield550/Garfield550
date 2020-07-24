'use strict'

const { src, dest, watch, series, parallel } = require('gulp')

const del = require('del')
const markdown = require('gulp-markdown')
const replace = require('gulp-replace')
const rename = require("gulp-rename")
const browserSync = require('browser-sync').create()

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

const destFileWatch = series(destFile, function browserSyncReload(done) {
  browserSync.reload()
  done()
})

function buildHtml() {
  const indexFile = src('./README.md')

  return indexFile
    .pipe(markdown())
    .pipe(replace('dist/', ''))
    .pipe(rename('index.html'))
    .pipe(dest('./dist'))
}

function develop() {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })

  watch('src/**/*.(scss|svg)', {
    ignoreInitial: false
  }, destFileWatch)

  watch('README.md', {
    ignoreInitial: false
  }, buildHtml)
}

exports.build = series([cleanDist, destFile])
exports.default = develop
