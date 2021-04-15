var gulp = require('gulp'),
    gulpConcat = require('gulp-concat');
function bundleup() {

    return gulp.src(['./dist/apps/loan-quote-widget/runtime.*.js', './dist/apps/loan-quote-widget/main.*.js'], {base: './'})
        .pipe(gulpConcat('loan-quote-widget.js'))
        .pipe(gulp.dest('dist/bundle'));
}

gulp.task('bundleup', bundleup);
