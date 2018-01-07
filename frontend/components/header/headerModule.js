/**
 * Created by safon on 13.09.17.
 */
require('./header.css');
var angular = require('angular');
var HeaderController = require('./headerController');
var headerComponent = require('./header.componet');


var UserAPI = require('../_common/services/UserAPI');

var headerLayout = angular.module('app.components.header',[]);
headerLayout.controller('HeaderController', HeaderController);
headerLayout.component('headerComponent', headerComponent());

module.exports = headerLayout;