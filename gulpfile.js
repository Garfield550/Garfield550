'use strict'

const { src, dest, watch, series, parallel } = require('gulp')

const del = require('del')
const markdown = require('gulp-markdown')
const rename = require("gulp-rename")
const browserSync = require('browser-sync').create()

const { buildSass } = require('./config/sass')
const { postCss, injectCss } = require('./config/css')
const { minifyHtml } = require('./config/minify')

const destPath = './dist'

function cleanDist() {
  return del(destPath)
}

function destSvgFile() {
  const styleFile = src('./src/sass/index.scss')
  const targetFile = src('./src/profile.svg')

  const style = styleFile
    .pipe(buildSass())
    .pipe(postCss({
      minify: true
    }))

  return targetFile
    .pipe(minifyHtml())
    .pipe(injectCss(style))
    .pipe(dest(destPath))
}

const destSvgFileWatch = series(destSvgFile, function browserSyncReload(done) {
  browserSync.reload()
  done()
})

function destMarkdownFile() {
  const markdownFile = src('./src/README.md')

  return markdownFile
    .pipe(dest(destPath))
}

function copyOtherFile() {
  const files = src([
    './LICENSE',
    './ThirdPartyNotices.txt'
  ])

  return files
    .pipe(dest(destPath))
}

function buildHtml() {
  const markdownFile = src('./src/README.md')

  return markdownFile
    .pipe(markdown())
    .pipe(rename('index.html'))
    .pipe(dest(destPath))
}

function develop() {
  browserSync.init({
    server: {
      baseDir: destPath
    }
  })

  watch('src/**/*.(scss|svg)', {
    ignoreInitial: false
  }, destSvgFileWatch)

  watch('src/README.md', {
    ignoreInitial: false
  }, buildHtml)
}

exports.build = series([cleanDist, destSvgFile, destMarkdownFile, copyOtherFile])
exports.default = develop
