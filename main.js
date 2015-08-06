'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');
var Tray = require('tray');
var Menu = require('menu');
var React = require('react');

require('crash-reporter').start();
// require('electron-debug')();

// メインウィンドウはGCされないようにグローバル宣言
var mainWindow = null;

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function() {
  //if (process.platform != 'darwin') {
    app.quit();
  //}
});

// Electronの初期化完了後に実行
app.on('ready', function() {
  // メニューアイコン設定
  var appIcon = new Tray(__dirname + '/images/icon.png');
  // コンテキストメニュー追加
  var contextMenu = Menu.buildFromTemplate([
    {label: 'メニュー1'},
    {label: 'メニュー2'},
    {type: 'separator'},
    {label: 'サブメニュー', submenu: [
      {label: 'サブメニュー1'},
      {label: 'サブメニュー2'}
      ]},
    {label: '終了', accelerator: 'Command+Q', click: function() { app.quit(); }}
  ]);
  appIcon.setContextMenu(contextMenu);
  // アイコンにマウスオーバーした時の説明
  appIcon.setToolTip('This is sample.');

  /*/ アプリケーションメニュー設定
  var menu = Menu.buildFromTemplate([
    {
      label: 'Sample',
      submenu: [
        {label: 'About'},
        {label: 'Quit'}
      ]
    },
    {
      label: 'File',
      submenu: [
        {label: 'New File'},
        {label: 'Paste'}
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {label: 'Copy', accelerator: 'Command+C', selector: 'copy'},
        {label: 'Paste', accelerator: 'Command+V', selector: 'paste'}
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);
  //*/

  // メイン画面の表示
  mainWindow = new BrowserWindow({
    'width': 500,
    'height': 600,
    //'icon': 'file://' + __dirname + '/icon.png',
    'transparent': true,
    'frame': false,
    'title': 'TodoIt'
  });
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});
