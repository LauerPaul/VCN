var gulp = require('gulp'),
    watch = require("gulp-watch"),
    if_ = require('gulp-if'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cache'),
    fs = require('fs'),
    cnf = JSON.parse(fs.readFileSync('./config.json'));

/**
 * [Tasks]
*/

/** default task */
gulp.task('default',
    [   
        'scss',
        'images',
    ],
function () {
    if(cnf.prop.css.min){
        gulp.watch(cnf.path.app + cnf.path.watch.scss, ['scss_min']);
    } else {
        gulp.watch(cnf.path.app + cnf.path.watch.scss, ['scss']);
    }
    gulp.watch(cnf.path.app + cnf.path.watch.images, ['images']);
    console.log("watch task init success...");
});

/** _init_ task */
gulp.task('_init_', ['default'], function () {
    console.log("task init success...");
});

/**
 * [Task scss]
*/

/** SCSS */
gulp.task('scss', ['scss_min'], function () {
    return gulp.src(cnf.path.app + cnf.path.css.in)
                .pipe(plumber())
                .pipe(if_(cnf.prop.css.sourcemap, sourcemaps.init()))
                    .pipe(sass({
                        outputStyle: 'nested',
                        precison: 3,
                        errLogToConsole: true
                    }).on('error', sass.logError))
                    .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
                .pipe(if_(cnf.prop.css.sourcemap, sourcemaps.write(cnf.path.css.sourcemap)))
                .pipe(gulp.dest(cnf.path.dst + cnf.path.css.out))
});

/** SCSS min */
gulp.task('scss_min', function () {
    if(cnf.prop.css.min){
        return gulp.src(cnf.path.app + cnf.path.css.in)
                    .pipe(plumber())
                    .pipe(if_(cnf.prop.css.sourcemap, sourcemaps.init()))
                        .pipe(sass({
                            outputStyle: 'compressed',
                            precison: 3,
                            errLogToConsole: true
                        }).on('error', sass.logError))
                        .pipe(prefix("last 1 version", "> 1%", "ie 8", "ie 7"))
                        .pipe(rename('styles.min.css'))
                    .pipe(if_(cnf.prop.css.sourcemap, sourcemaps.write(cnf.path.css.sourcemap)))
                    .pipe(gulp.dest(cnf.path.dst + cnf.path.css.out))
    }
});

/**
 * [Task images]
*/

/** Images */
gulp.task('images', function () {
    gulp.src(cnf.path.app + cnf.path.images.in)
        .pipe(cache(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        })))
        .pipe(gulp.dest(cnf.path.dst + cnf.path.images.out))
});
