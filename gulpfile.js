//gulp stuff i need
var pkg = require('./package.json'),
    gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename')

// non-gulp stuff i need
var _ = require('lodash'),
    http = require('http'),
    serveStatic = require('serve-static')
    connect = require('connect')

//other stuff
var serverPort = 3000,
    buildLocation = 'build',
    paths = {
      scripts: ['scripts/**/*.js'],
      styles: ['styles/**/*.css'],
      build: [buildLocation + '/' + pkg.name + '.js']
    }

gulp.task('compileScripts', function () {
  gulp.src(paths.scripts)
      .pipe(plumber())
      .pipe(concat(pkg.name + '.js'))
      .pipe(gulp.dest(buildLocation))
})

gulp.task('compressScripts', function () {
  gulp.src(paths.build)
      .pipe(uglify())
      .pipe(rename(pkg.name + '.min.js'))
      .pipe(gulp.dest(buildLocation))
})

gulp.task('compressStyles', function () {
  gulp.src(paths.styles)
      .pipe(plumber())
      .pipe(concatCss(pkg.name + '.css'))
      .pipe(gulp.dest(buildLocation))
})

// rebuild files on change
gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['build'])
  gulp.watch(paths.styles, ['build'])
})

// launch this repo as a server (port 3000)
gulp.task('serve', function () {
  var app = connect()
  app.use(serveStatic('.'), { index: 'index.html'})
  app.listen(serverPort)
  console.log('server running on localhost:' + serverPort)
})

// builds everything to the `dist` directory
gulp.task('build', ['compileScripts', 'compressStyles', 'compressScripts'])

// runs a build and launches a server
gulp.task('default', ['build', 'watch', 'serve'])
