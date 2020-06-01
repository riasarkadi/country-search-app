const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

sass.compiler = require('node-sass');

gulp.task('sass', done => {
    gulp.src('src/style/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(gulp.dest('dist/css'))
    done();
});

gulp.task('js', done => {
    gulp.src([
        "node_modules/angular/angular.js",
        "src/app/**/*.js",
        "!src/app/**/*.spec.js"
    ])
        .pipe(babel({ "presets": ["@babel/preset-env"], "compact": false }))
        .pipe(uglify())
        .pipe(concat('bundle.js'))
        .pipe(gulp.dest('dist/js'));
    done();
});

gulp.task('html', function () {
    return gulp.src([
        'src/app/**/*.html',
        'src/index.html'
    ])
        .pipe(gulp.dest('dist'))
});

gulp.task('build', gulp.parallel('sass', 'js', 'html'));

gulp.task('browser-sync', function () {
    browserSync.init(null, {
        open: false,
        server: {
            baseDir: 'dist',
        }
    });
});

gulp.task('dev', gulp.parallel('build', 'browser-sync'), function () {
    gulp.watch('src/style/**/*.scss', 'sass');
    gulp.watch('src/app/**/*.js', 'js');
    gulp.watch('src/app/**/*.html', 'html');
});