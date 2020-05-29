const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
 
sass.compiler = require('node-sass');

let devMode = false;

gulp.task('sass', function () {
    return gulp.src('src/style/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('js', function() {
    gulp.src([
        "node_modules/angular/angular.js",
        "node_modules/angular-route/angular-route.js",
        "src/app/**/*.js"
    ])
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', function() {
    return gulp.src([
        'src/app/**/*.html',
        'src/index.html'
    ])
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('build', gulp.parallel('sass', 'js', 'html'));

gulp.task('browser-sync', function() {
    browserSync.init(null, {
        open: false,
        server: {
            baseDir: 'dist',
        }
    });
});

gulp.task('dev', gulp.parallel('build', 'browser-sync'), function() {
    devMode = true;

    gulp.watch('src/style/**/*.scss', 'sass');
    gulp.watch('src/app/**/*.js', 'js');
    gulp.watch('src/app/**/*.html', 'html');
});