const gulp = require('gulp');
const del = require('del');
const sass = require('gulp-sass');
const server = require('gulp-server-livereload');

const buildDir = './dist';
const srcDir = './src';

gulp.task('clean', function() {
  return del.sync(buildDir + '/**/*');
});

// Processes sass and copies to build dir
gulp.task('sass', function() {
  return gulp.src(srcDir + '/**/*.sass')
    .pipe(sass())
    .pipe(gulp.dest(buildDir));
});

// Copies static html from ./src to build dir
gulp.task('copy:html', function() {
  return gulp.src(srcDir + '/**/*.html')
    .pipe(gulp.dest(buildDir));
})

// Copies static js from ./src to build dir
gulp.task('copy:js', function() {
  return gulp.src(srcDir + '/**/*.js')
    .pipe(gulp.dest(buildDir));
})

// Copies static slick from ./src to build dir
gulp.task('copy:slick', function() {
  return gulp.src(srcDir + '/css/ajax-loader.gif')
    .pipe(gulp.dest(buildDir));
})

// Copies static assets from ./src/img to build dir
gulp.task('copy:assets', function() {
  return gulp.src(srcDir + '/img/**/*')
    .pipe(gulp.dest(buildDir +'/img/'));
});

// Wrapper tasks for building
gulp.task('static', ['copy:html', 'copy:js', 'copy:assets', 'copy:slick']);
gulp.task('build', ['clean', 'sass', 'static']);

// Serve locally and watch for changes
return gulp.task('serve', ['build'], function() {
  gulp.src(buildDir)
    .pipe(server({
      livereload: true,
      open: true,
      port: 8080,
      log: 'debug'
    }));
  return gulp.watch(srcDir + '/**/*', ['build']);
});
