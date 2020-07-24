'use strict'

const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const sorting = require('postcss-sorting')
const cssnano = require('cssnano')
const inject = require('gulp-inject')

/**
 * @typedef {Object} PostCSSOptions
 * @property {boolean} minify - Use cssnano to minify css.
 */
/**
 * 
 * @param {PostCSSOptions} options PostCss options.
 */
function postCss(options = {}) {
  const plugins = [
    autoprefixer(),
    sorting(),
  ]

  if (options.minify) {
    plugins.push(cssnano())
  }

  return postcss(plugins)
}

/**
 * @param {NodeJS.ReadableStream} source NodeJS.ReadableStream.
 */
function injectCss(source) {
  return inject(source, {
    removeTags: true,
    starttag: '<!-- inject:{{ext}} -->',
    transform: function (_, file) {
      return file.contents.toString('utf8')
    }
  })
}

exports.postCss = postCss
exports.injectCss = injectCss
