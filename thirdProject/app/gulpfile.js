
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// Sass build task
gulp.task('sass', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

// Watch the sass files
gulp.task('watch', ['browserSync'], function (){
  gulp.watch('./scss/**/*.scss', ['sass']);
})

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

// Default build task
gulp.task('default', ['sass', 'watch']);