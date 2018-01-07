/**
 * Created by safon on 09.09.17.
 */
require('./home.css');
var angular = require('angular');

var uiRouterConfig = require('./homeRoute');

var homeComponent = require('./home.component');



var HomePage = angular.module('homePage',[]);

HomePage.config(uiRouterConfig);
HomePage.component('homeComponent', homeComponent());





module.exports = HomePage;
