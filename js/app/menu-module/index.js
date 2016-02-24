'use strict';

const menu = angular.module('menu', []);

menu.directive('mailDirectories', require('./directories-menu/directories-menu-directive'));
menu.directive('menu', require('./menu/menu-directive'));

module.exports = menu;