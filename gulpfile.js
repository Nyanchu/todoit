'use strict'

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var electron = require('electron-connect').server.create();

var libDir = 'lib';

gulp.task('compile-js', function(){
  return gulp.src('src/**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.babel({
      stage: 0
    }))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(libDir))
    ;
});

gulp.task('compile-html', function(){
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest(libDir))
    ;
});

gulp.task('start', ['compile-js', 'compile-html'], function(){
  // electron開始
  electron.start();
  gulp.watch(libDir + '/main.js', electron.restart);
});
