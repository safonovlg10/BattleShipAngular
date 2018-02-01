/**
 * Created by safon on 20.10.17.
 */
function gameModeController($rootScope, gamePlaceFactory, UserAPI, shipFactory, fireService, moveService) {

    var ctrl = this;
    var arrShip = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
    //[4];
    var moveComp = moveService;

    ctrl.seaUser = gamePlaceFactory.createInstanceGamePlace(UserAPI.getUserName());
    ctrl.seaUser = ctrl.seaUser.setSeaInstall();

    ctrl.seaUser.InstallationOfShipsAtSea(arrShip);


    ctrl.seaComp = gamePlaceFactory.createInstanceGamePlace('comp');
    ctrl.seaComp = ctrl.seaComp.setSeaInstall();
    ctrl.seaComp.InstallationOfShipsAtSea(arrShip);


    console.log(ctrl.seaUser);


    ctrl.startGame = function () {
        var playerActiv = ctrl.getRandomInt(0, 1);

        playerActiv === 1 ? ctrl.seaUser.setActiveBoard(true) : ctrl.seaComp.setActiveBoard(true);
        if (ctrl.seaUser.getActiveBoard()) {

        } else if (ctrl.seaComp.getActiveBoard()) {
            ctrl.compFire();
        }
        ctrl.game();

    };

    ctrl.game = function () {

        $rootScope.$on('fireToPosition', function (event, data) {
            // moveService.countingOfDeadShips(ctrl.seaUser.getSeaInstall().getPolygon(), ctrl.seaComp.getSeaInstall().getPolygon())
            if(!ctrl.seaUser.getIsVictory() && !ctrl.seaComp.getIsVictory() ) {


                if (data.seaObject.fieldActive) {
                    if (ctrl.seaUser.getActiveBoard()) {
                        ctrl.userFire(data);
                    } else if (ctrl.seaComp.getActiveBoard()) {
                        ctrl.compFire();
                    }
                }
            }else {

                ctrl.seaComp.getIsVictory() ? console.log('111 Вы проиграли ((((') : console.log('111 Ура Вы выйграли :):):)')
            }


        });


    };




    ctrl.userFire = function (pos) {

        console.log('Я стреляю  ');
        pos.seaObject.fieldActive = false;

        if (fireService.checkForMissOrHit(pos.seaObject.obj)) {

            fireService.toDestroyShip(pos.seaObject, pos.seaObject.obj, ctrl.seaComp);
            var checkVictory = fireService.countingOfDeadShips(ctrl.seaComp.getSeaInstall().getPosArray(), ctrl.seaComp );

            if (checkVictory){
                ctrl.seaComp.getIsVictory() ? console.log('111 Вы проиграли ((((') : console.log('111 Ура Вы выйграли :):):)')

            }

            ctrl.seaUser.setActiveBoard(true);
            ctrl.seaComp.setActiveBoard(false);
        } else {
            pos.seaObject.obj = 'slip';

            ctrl.seaUser.setActiveBoard(false);
            ctrl.seaComp.setActiveBoard(true);
            ctrl.compFire();
        }


    };


    ctrl.compFire = function () {
        var stroke = true, maxNumberOfMoves = 0;


        while (stroke) {
            var count = ctrl.getRandomInt(0, 99);
            var posSea = ctrl.seaUser.getSeaInstall().getPolygon();
            maxNumberOfMoves++;
            console.log(ctrl.seaUser.getSeaInstall().getPolygon());
            if (!ctrl.seaComp.getIsVictory() && !ctrl.seaComp.getIsVictory()) {
                if (posSea[count].fieldActive) {

                    // ToDo  исправить приаритет вхождение в цикл (поднять выше функцию finishOffAShip)
                    if (moveComp.getStatusProgress() === 'yes') {
                        stroke = fireService.finishOffAShip(ctrl.seaUser.getSeaInstall().getPolygon(), ctrl.seaUser, ctrl.seaComp);

                    } else {
                        if (fireService.checkForMissOrHit(posSea[count].obj)) {
                            var ship = posSea[count].obj;
                            moveComp.setId(posSea[count]);
                            moveComp.setObjShip(ship);
                            console.log(moveComp);
                            posSea[count].fieldActive = false;

                            ctrl.seaComp.setActiveBoard(true);
                            ctrl.seaUser.setActiveBoard(false);


                            fireService.toDestroyShip(posSea[count], posSea[count].obj, ctrl.seaUser);
                            console.log('tpp  ' + posSea[count].position.x + ' x ' + posSea[count].position.y);

                           var checkVictory = fireService.countingOfDeadShips(ctrl.seaUser.getSeaInstall().getPosArray(), ctrl.seaUser );

                           if (checkVictory){
                               ctrl.seaComp.getIsVictory() ? console.log('111 Вы проиграли ((((') : console.log('111 Ура Вы выйграли :):):)')

                           }

                            if (ship.getIsKilled()) {
                                moveService.setStatusProgress('yes');
                            }


                        } else {
                            ctrl.seaComp.setActiveBoard(false);
                            ctrl.seaUser.setActiveBoard(true);
                            stroke = false;
                            posSea[count].obj = 'slip';
                            posSea[count].fieldActive = false;
                            console.log('mimo  ' + posSea[count].position.x + ' x ' + posSea[count].position.y);
                        }
                    }
                }
                else {
                    console.log('maximum number of moves  ' + maxNumberOfMoves + '  ' + posSea[count].position.x + ' x ' + posSea[count].position.y);


                }

            }else {

                ctrl.seaComp.getIsVictory() ? console.log('222 Вы проиграли ((((') : console.log('222 Ура Вы выйграли :):):)');


            }
        }

    };


    ctrl.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


}

gameModeController.$inject = ['$rootScope', 'gamePlaceFactory', 'UserAPI', 'shipFactory', 'fireService', 'moveService'];
module.exports = gameModeController;