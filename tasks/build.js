var gulp = require('gulp');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var buffer      = require('vinyl-buffer');

// build src
gulp.task('browserify', function(cb){	
 	return browserify('./src/app.js', {
            debug: true,
            //transform: ['debowerify']
        })
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./www/'));

    cb();
});

// build:release
gulp.task('browserify:release', function(cb){
	
 	return browserify('./src/app.js')
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest('./www/'));

    cb();
});

gulp.task('fonts', function(cb){
 	return gulp.src('node_modules/ionic-framework/release/fonts/**')
        .pipe(gulp.dest('./www/fonts/'));
    cb();
});

gulp.task('assets', function(cb){
 	return gulp.src('./assets/**')
        .pipe(gulp.dest('./www/'));
    cb();
});

// copy templates
gulp.task('templates', function(cb){
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./www/'));
    cb();
});