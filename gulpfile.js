var gulp         = require('gulp'),
    jade         = require('gulp-jade'),
    postcss      = require('gulp-postcss'),
    simpleVars   = require('postcss-simple-vars'),
    autoprefixer = require('autoprefixer-core');

var buildDir = './build/';


// tasks

gulp.task('template', function () {
    gulp.src('./*.jade')
        .pipe(jade({
            locals: {}
        }))
        .pipe(gulp.dest(buildDir));
});

gulp.task('style', function () {
    gulp.src('./style.css')
        .pipe(postcss([
            autoprefixer({ browser: [
                '> 1%', 'last 2 versions',
                'Firefox ESR', 'Opera 12.1',
                'ie 8', 'ie 9'
            ] }),
            simpleVars()
        ]))
        .pipe(gulp.dest(buildDir));
});

gulp.task('images', function () {
    gulp.src('./images/*.jpg')
        .pipe(gulp.dest(buildDir + '/img/'));
});

gulp.task('watch', function () {
    gulp.watch('./*.jade', ['template']);
    gulp.watch('./*.css',  ['style']);
});

gulp.task('build',   ['template', 'style', 'images']);
gulp.task('develop', ['build', 'watch']);
gulp.task('default', ['build']);