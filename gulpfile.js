"use strict"
// Load plugins

const autoprefixer = require("gulp-autoprefixer")
const cleanCSS = require("gulp-clean-css")
const concat = require('gulp-concat')
const gulp = require("gulp")
const rename = require("gulp-rename")
const uglify = require("gulp-uglify")
const server = require('gulp-live-server').new('./server.js')

// server config
function serverStart() {
    server.start()
}

// server reload
function serverReset() {
  server.stop()
  server.start()
}

// CSS task
function css() {
  return gulp
      .src("./css/*.css")
      .pipe(cleanCSS({
        debug: true,
        compatibility: 'ie8',
        level: {
          1: {
            specialComments: 0,
          },
        },
      }))
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(rename({
        basename: 'main-styles',
        suffix: '.min',
      }))
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest('./public'))
}

// JS task
function js() {
  return gulp
    .src([
      './js/*.js',
      '!./js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./public/js'))
}

// Watch files
function watchFiles() {
  gulp.watch("./css/**/*", css)
  gulp.watch("./js/**/*", js)
  gulp.watch("./**/*.html", serverReset)
  gulp.watch("./server.js", serverReset)
}

const build = gulp.parallel(css, js)
const watch = gulp.series(build, gulp.parallel(watchFiles, serverStart))

// Export tasks
exports.css = css
exports.js = js
exports.build = build
exports.watch = watch
exports.default = build

