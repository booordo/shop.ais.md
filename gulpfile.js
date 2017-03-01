var gulp          = require('gulp');
var sass          = require('gulp-sass');
var pug           = require('gulp-pug');
var wait          = require('gulp-wait');
var browserSync   = require('browser-sync').create();

gulp.task('server', ['sass', 'pug', 'js'], function() {
    browserSync.init({ server: "./build/" });
    gulp.watch("./sources/scss/**/*.scss", ['sass']);
    gulp.watch("./sources/pug/**/*.pug", ['pug']);
    gulp.watch("./sources/js/*.js", ['js']);
});

gulp.task('sass', function() {
    return gulp.src("./sources/scss/*.scss")
        .pipe(wait(1000))
        .pipe(sass())
        .pipe(gulp.dest("./build/css/"))
        .pipe(browserSync.stream());
});

gulp.task('pug', function() {
    return gulp.src("./sources/pug/*.pug")
        .pipe(wait(1000))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest("./build/"))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src("./sources/js/*.js")
        .pipe(gulp.dest("./build/js/"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['server']);