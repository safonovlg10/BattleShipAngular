/**
 * Created by safon on 21.08.17.
 */

'use strict';


//angular
var angular = require('angular');
var uiRouter = require('angular-ui-router');

//page
var homeModule = require('./page/home/home.module');
var menu =  require('./page/menu/indexMenuModule');
var layout = require('./components/_layout/layout');

//service
var UserAPI  = require('./components/_common/services/UserAPI');




var app = angular.module('app', ['ui.router',homeModule.name,layout.name,menu.name]);
app.service('UserAPI', UserAPI);



