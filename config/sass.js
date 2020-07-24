'use strict'

const sass = require('gulp-sass')

sass.compiler = require('sass')

function buildSass() {
  return sass().on('error', sass.logError)
}

exports.buildSass = buildSass
