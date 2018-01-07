/**
 * Created by safon on 12.09.17.
 */
var angular = require('angular');
var appLayoutRun = require('./layout.route');
var layoutComponent = require('./layoutComponent');
var layoutController = require('./layout.controller');

var header = require('../header/headerModule');

var layout = angular.module('app.layout',[header.name]);
layout.config(appLayoutRun);
layout.controller('layoutController', layoutController);
layout.component('layoutComponent', layoutComponent);

module.exports = layout;