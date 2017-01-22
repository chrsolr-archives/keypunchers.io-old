'use strict';

const config = require('./server/config/config');
const gulp = require('gulp');
const glp = require('gulp-load-plugins')({ lazy: true });

gulp.task('sass-compile', () => {
    return gulp.src(config.paths.CSS + 'sass/style.scss')
        .pipe(glp.sass().on('error', glp.sass.logError))
        .pipe(gulp.dest(config.paths.CSS));
});

gulp.task('autoprefixer', ['sass-compile'], () =>
    gulp.src(config.paths.CSS + 'style.css')
        .pipe(glp.autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(config.paths.CSS))
);

gulp.task('minify-css', ['autoprefixer'], () => {
    return gulp.src(config.paths.CSS + 'style.css')
        .pipe(glp.cssnano(config.gulp.cssnanoOpts))
        .pipe(glp.rename('style.min.css'))
        .pipe(gulp.dest(config.paths.CSS));
});

gulp.task('copy-require-main-js', ['copy-jquery-private-js'], () => {
    return gulp.src(`${config.paths.TYPESCRIPT}config/main.js`)
    .pipe(gulp.dest(config.paths.JS));
});

gulp.task('copy-jquery-private-js', () => {
    return gulp.src(`${config.paths.TYPESCRIPT}config/jquery-private.js`)
    .pipe(gulp.dest(`${config.paths.JS}/scripts`));
});

gulp.task('tsconfig', () => {
    var tsConfig = glp.tsconfig(config.gulp.ts_config_json);

    return gulp.src([config.paths.TYPESCRIPT + "**/*.ts"])
        .pipe(tsConfig())
        .pipe(gulp.dest('./'));
});

gulp.task('ts-compile', ['tsconfig'], () => {
    var ts = glp.typescript;
    var tsProject = ts.createProject('./tsconfig.json');

    return tsProject.src()
        .pipe(ts(tsProject)).js
        .pipe(gulp.dest(`${config.paths.JS}`));
});

gulp.task('ts-compile-no-deps', () => {
    var ts = glp.typescript;
    var tsProject = ts.createProject('./tsconfig.json');

    return tsProject.src()
        .pipe(ts(tsProject)).js
        .pipe(gulp.dest(`${config.paths.JS}`));
});

gulp.task('default', ['minify-css', 'ts-compile', 'copy-require-main-js']);