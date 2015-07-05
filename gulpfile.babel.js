import gulp from 'gulp';

var config = {};

config.template = 'app/template/pages/index.jade';
config.style    = 'app/style/common.css';
config.images   = 'app/images/*.jpg';
config.buildDir = 'build/';

// tasks

gulp.task('template', () => {
    let jade = require('gulp-jade');

    gulp.src(config.template)
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(config.buildDir));
});

gulp.task('style', () => {
    let vars = require('./app/style/variables.js');

    let postcss      = require('gulp-postcss'),
        simpleVars   = require('postcss-simple-vars'),
        nested       = require('postcss-nested'),
        autoprefixer = require('autoprefixer-core');

    let postProcessors = [
        autoprefixer({ browser: [
            '> 1%', 'last 2 versions',
            'Firefox ESR', 'Opera 12.1',
            'ie 8', 'ie 9'
        ] }),
        simpleVars({ variables: vars }),
        nested()
    ];

    gulp.src(config.style)
        .pipe(postcss(postProcessors))
        .pipe(gulp.dest(config.buildDir));
});

gulp.task('images', () => {
    gulp.src(config.images)
        .pipe(gulp.dest(config.buildDir + '/img/'));
});

gulp.task('watch', () => {
    gulp.watch('./*.jade', ['template']);
    gulp.watch('./*.css',  ['style']);
});

gulp.task('open', () => {
    let open = require('gulp-open');

    gulp.src(config.buildDir + './index.html')
        .pipe(open('<%file.path%>'));
});

gulp.task('build',   ['template', 'style', 'images']);
gulp.task('develop', ['build', 'watch']);
gulp.task('default', ['build']);