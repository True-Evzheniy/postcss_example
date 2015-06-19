import gulp from 'gulp';

var buildDir = './build/';


// tasks

gulp.task('template', () => {
    let jade = require('gulp-jade');

    gulp.src('./*.jade')
        .pipe(jade({
            locals: {}
        }))
        .pipe(gulp.dest(buildDir));
});

gulp.task('style', () => {
    let postcss      = require('gulp-postcss'),
        simpleVars   = require('postcss-simple-vars'),
        nested       = require('postcss-nested'),
        autoprefixer = require('autoprefixer-core');

    gulp.src('./style.css')
        .pipe(postcss([
            autoprefixer({ browser: [
                '> 1%', 'last 2 versions',
                'Firefox ESR', 'Opera 12.1',
                'ie 8', 'ie 9'
            ] }),
            simpleVars(),
            nested()
        ]))
        .pipe(gulp.dest(buildDir));
});

gulp.task('images', () => {
    gulp.src('./images/*.jpg')
        .pipe(gulp.dest(buildDir + '/img/'));
});

gulp.task('watch', () => {
    gulp.watch('./*.jade', ['template']);
    gulp.watch('./*.css',  ['style']);
});

gulp.task('open', () => {
    let open = require('gulp-open');

    gulp.src(buildDir + './index.html')
        .pipe(open('<%file.path%>'));
});

gulp.task('build',   ['template', 'style', 'images']);
gulp.task('develop', ['build', 'watch']);
gulp.task('default', ['build']);