var gulp = require('gulp'),
    gulpConcat = require('gulp-concat'),
    gulpRename = require('gulp-rename');
function bundleup() {
    const srcPath = './dist/apps/loan-quote-widget';
    const concatBuildFiles = [
        srcPath + '/runtime.js',
        srcPath + '/polyfills.esm.js',
        srcPath + '/vendor.esm.js',
        srcPath + '/main.esm.js'
    ];

    return gulp.src(concatBuildFiles, {base: './'})
        .pipe(gulpConcat('concat.js'))
        .pipe(gulp.dest('dist'))
        .pipe(gulpRename('loan-quote-widget.js'))
        .pipe(gulp.dest('dist/bundle'));
}

gulp.task('bundleup', bundleup);
