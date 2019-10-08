var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
const html2pug = require('gulp-html2pug');

//Task para conversão de scss para css
gulp.task('sass', function(){
    return gulp.src('public/stylesheets.scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/stylesheets.css'));
});


//Task para o watch
gulp.task('watch', function(){
    gulp.watch('public/stylesheets.scss/*.scss', [sass]);
});

gulp.task('pug', function() {
    // Backend locales
    return gulp.src('public/stylesheets/admin-lte/pages/UI/*.html')
    .pipe(html2pug(/* options for html2pug such as { fragment: true } */))
    .pipe(gulp.dest('public/stylesheets/admin-lte/pug'));
  });

