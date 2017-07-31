'use strict';

const config = require('./server/config/config');
const gulp = require('gulp');
const glp = require('gulp-load-plugins')({
    lazy: true
});

gulp.task('sass-compile', () => {
    return gulp.src(config.paths.SASS + 'style.scss')
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

gulp.task('copy-require-main-js', () => {
    return gulp.src(`${config.paths.TYPESCRIPT}config/main.js`)
        .pipe(gulp.dest(config.paths.JS));
});

gulp.task('prismjs-js', ['prismjs-css'], () => {
    const languages = [
        './node_modules/prismjs/prism.js',
        './node_modules/prismjs/components/prism-csharp.min.js',
        './node_modules/prismjs/components/prism-jade.min.js',
        './node_modules/prismjs/components/prism-typescript.min.js',
        './node_modules/prismjs/components/prism-scss.min.js',
        './node_modules/prismjs/components/prism-bash.min.js',
        './node_modules/prismjs/components/prism-markup.min.js',
        './node_modules/prismjs/plugins/toolbar/prism-toolbar.min.js',
        './node_modules/prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js',
        './node_modules/prismjs/plugins/line-numbers/prism-line-numbers.min.js'
    ];

    return gulp.src(languages)
        .pipe(glp.concat('prism.js'))
        .pipe(glp.minify(config.gulp.minify_opts))
        .pipe(gulp.dest(`${config.paths.LIBS}prism/`));
});

gulp.task('prismjs-css', () => {
    const themes = [
        './node_modules/prismjs/themes/prism-okaidia.css',
        './node_modules/prismjs/plugins/toolbar/prism-toolbar.css',
        './node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css'
    ];

    return gulp.src(themes)
        .pipe(glp.concat('prism.css'))
        .pipe(glp.cssnano(config.gulp.cssnanoOpts))
        .pipe(glp.rename('prism.min.css'))
        .pipe(gulp.dest(`${config.paths.LIBS}prism/`));
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
        .pipe(tsProject(ts.reporter.nullReporter())).js
        .pipe(glp.minify(config.gulp.minify_opts))
        .pipe(gulp.dest(`${config.paths.JS}`));
});

gulp.task('default', ['minify-css', 'ts-compile', 'prismjs-js', 'copy-require-main-js']);