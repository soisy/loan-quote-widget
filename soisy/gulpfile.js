var gulp = require('gulp'),
    gulpConcat = require('gulp-concat'),
    gulpRename = require('gulp-rename'),
    gulpUglify = require('gulp-uglify');

function bundleup() {
    const srcPath = './dist/apps/loan-quote-widget';
    const concatBuildFiles = [
        srcPath + '/runtime.js',
        srcPath + '/polyfills.esm.js',
        srcPath + '/vendor.esm.js',
        srcPath + '/main.esm.js'
    ];

    return gulp.src(concatBuildFiles)
        .pipe(gulpConcat('concat.js'))
        .pipe(gulp.dest('dist'))
        .pipe(gulpRename('loan-quote-widget.js'))
        .pipe(gulp.dest('dist'));
}

gulp.task('bundleup', bundleup);
