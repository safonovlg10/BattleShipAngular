/**
 * Created by safon on 02.09.17.
 */

var angular = require('angular');

var uiRouterConfig = require('./menu.route');
var moduleOfGame = require('../modeOfGame/moduleOfGame');

var Menu = angular.module('menu',[moduleOfGame.name]).config(uiRouterConfig);




module.exports = Menu;