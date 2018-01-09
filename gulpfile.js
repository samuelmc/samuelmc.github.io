var gulp = require('gulp');
var highlight = require('gulp-highlight');
var $ = require('gulp-load-plugins')();

var sassPaths = [
    'bower_components/normalize.scss/sass',
    'bower_components/foundation-sites/scss',
    'bower_components/foundation-perfect-scrollbar/src/scss/plugin',
    'bower_components/foundation-select/src/scss/plugin',
    'bower_components/motion-ui/src',
    'bower_components/font-awesome/scss',
    'bower_components/mathsass/dist',
    'bower_components/sass-triangle'
];

gulp.task('sass', function () {
    return gulp.src('scss/app.scss')
        .pipe($.sass({
            includePaths: sassPaths,
            outputStyle: 'compressed' // if css compressed **file size**
        })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest('css'));
});

gulp.task('default', ['sass'], function () {
    gulp.watch(['scss/**/*.scss'], ['sass']);
});
