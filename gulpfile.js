const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function styles() {
  return gulp.src('./scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css/'));
};

function watch() {
  gulp.watch('./scss/**/*.scss', styles);
}

exports.default = gulp.series(watch);