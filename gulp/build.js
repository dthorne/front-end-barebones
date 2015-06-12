var gulp = require('gulp');
var wiredep = require('wiredep');
var sync = require('gulp-sync')(gulp);
var clean = require('gulp-clean');

var $ = require('gulp-load-plugins')();

var buildLib = "build/lib";
var devLib = "app/lib";

//move bower_components
gulp.task('lib-js', function() {
	gulp.src(wiredep().js)
		.pipe(gulp.dest(buildLib))
		.pipe(gulp.dest(devLib));
});

//move bower_components
gulp.task('lib-css', function() {
	if(wiredep().css) {
		gulp.src(wiredep().css)
			.pipe(gulp.dest(buildLib))
			.pipe(gulp.dest(devLib));
	}
});

//move js files
gulp.task('move', function() {
	gulp.src('app/js/**/*.*', {base: './app/'})
		.pipe(gulp.dest('build'));
});

gulp.task('inject', ['lib-js', 'lib-css', 'move'], function() {
	gulp.src('app/index.html')
		.pipe(wiredep.stream({
			fileTypes: {
				html: {
					replace: {
						js: function(filePath) {
							return '<script src="' + 'lib/' + filePath.split('/').pop() + '"></script>'; 
						},
						css: function(filePath) {
							return '<link rel="stylesheet" href="' + 'lib/' + filePath.split('/').pop() + '"/>';
						}
					}
				}
			}
		}))
		.pipe($.inject(
			gulp.src(['app/js/**/*.js'], {read: false}), {
				addRootSlash: false,
				transform: function(filePath, file, i, length) {
					return '<script src="' + filePath.replace('app/', '') + '"></script>';
				}
			}
		))
		.pipe($.inject(
      		gulp.src(['app/styles/**/*.css'], { read: false }), {
		        addRootSlash: false,
		        transform: function(filePath, file, i, length) {
        			return '<link rel="stylesheet" href="' + filePath.replace('app/', '') + '"/>';
      			}
      		}
		))
		.pipe(gulp.dest('build'))
		.pipe(gulp.dest('app'))
		.pipe($.livereload());
});


gulp.task('clean', function() {
	return gulp.src(['build/*', 'app/lib/*'])
		.pipe(clean());
});

gulp.task('build', sync.sync(['clean', ['inject']]));