'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

gulp.task('watch', function () {
    var livereload = require('gulp-livereload');

    livereload.listen();
    // watch for changes
    gulp.watch([
        'app/partials/**/*.html',
        'app/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/images/**/*',
        'app/index.html',
        'bower.json'
    ]).on('change', function (file) {
        gulp.start('build');
        livereload();
    });

    // gulp.watch(['app/scripts/**/*.js', 'bower.json'], ['inject']);
});

gulp.task('dev', ['watch', 'serve']);