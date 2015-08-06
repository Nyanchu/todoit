'use strict'

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var electron = require('electron-connect').server.create();

var srcDir = 'src';
var libDir = 'build';

// jsファイルのコンパイル。
gulp.task('compile-js', function(){
  return gulp.src(srcDir + '/**/*.{js,jsx}')
    .pipe($.babel({
      stage: 0
    }))
    .pipe(gulp.dest(libDir));
});

// HTMLファイルのコンパイル。今はコピーしてるだけ。minifyかけてもいいかも。
gulp.task('compile-html', function(){
  return gulp.src(srcDir + '/**/*.{html,css}')
    .pipe(gulp.dest(libDir))
    ;
});

// コンパイルしてElectron起動
gulp.task('start', ['compile-js', 'compile-html'], function(){
  // electron開始
  electron.start();
  // ファイルが変更されたら再コンパイル
  gulp.watch(srcDir + '/**/*.{html,css}', ['compile-html']);
  gulp.watch(srcDir + '/**/*.{js,jsx}', ['compile-js']);
  // BrowserProcessが読み込むファイルが変更されたらRestart。
  gulp.watch(['main.js'], electron.restart);
  // RendererProcessが読み込むファイルが変更されたらReload。
  gulp.watch(['index.html', libDir + '/**/*.{html,js,css}'], electron.reload);
});
