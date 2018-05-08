
const gulp = require('gulp')
const sass = require('gulp-sass')

// Sass build task
gulp.task('sass', function() {
    gulp.src('style/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(file => file.base));
});

// Watch the sass files
gulp.task('watch', function() {
    gulp.watch('./src/**/*.scss', ['sass']);
});

// Default build task
gulp.task('default', ['sass', 'watch']);