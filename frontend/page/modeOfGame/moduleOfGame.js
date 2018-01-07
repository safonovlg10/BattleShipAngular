/**
 * Created by safon on 19.10.17.
 */
var angular =  require('angular');

require('../../components/gameBorder/play.border.style.css');

var gameConfig = require('./game.router');
var gameComponent = require('./game.component');
var seaFactory = require('../../factory/seaFactory');


var seaComponent = require('../../components/gameBorder/saeComponent/sea.component');
var shipComponent = require('../../components/gameBorder/shipComponent/ship.component');
var heroDetailComponent = require('../../components/gameBorder/saeDetailComponent/heroDetail');
var playBoarder = require('../../components/gameBorder/playeBoard');
var gamePlaceFactory = require('../../factory/game.place.factory');
var shipFactory = require('../../factory/shipsFactory');
var bloomer = require('../../factory/bloomer');
var fireService = require('../../../gameService/fire.service');
var moveService = require('../../../gameService/move.service');

var game = angular.module('game',[]);
game.config(gameConfig);
game.component('gameModeComponent', gameComponent());
game.component('playBoarder', playBoarder());
game.component('sea',seaComponent());
game.component('heroDetail',heroDetailComponent());
game.component('ship',shipComponent());
game.factory('gamePlaceFactory',gamePlaceFactory);
game.factory('seaFactory', seaFactory);
game.factory('shipFactory',shipFactory);
game.factory('bloomer',bloomer);
game.service('fireService',fireService);
game.service('moveService',moveService);
module.exports = game;