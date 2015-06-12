'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

gulp.task('connect:src', function () {
  var connect = require('connect');
  var serveStatic = require('serve-static');
  var app = connect()
    .use(serveStatic('app'))
    .use(require('serve-index')('app'));

  gulp.server = require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server on http://localhost:9000');
    });
});

gulp.task('connect:build', function () {
  var connect = require('connect');
  var serveStatic = require('serve-static');
  var app = connect()
    .use(serveStatic('build'));

  gulp.server = require('http').createServer(app)
    .listen(9000)
    .on('listening', function () {
      console.log('Started connect web server for dist files on http://localhost:9000');
    });
});

gulp.task('serve', ['connect:src'], function () {
  require('opn')('http://localhost:9000');
});

gulp.task('serve:build', ['connect:build'], function () {
    require('opn')('http://localhost:9000');
});
