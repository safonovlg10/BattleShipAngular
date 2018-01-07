/**
 * Created by safon on 20.10.17.
 */
function gameModeController($rootScope,gamePlaceFactory,UserAPI,shipFactory,fireService,moveService) {

    var ctrl = this;
    var arrShip = [4];
    var moveComp = moveService;

    ctrl.seaUser = gamePlaceFactory.createInstanceGamePlace(UserAPI.getUserName());
   ctrl.seaUser = ctrl.seaUser.setSeaInstall();

    ctrl.seaUser.InstallationOfShipsAtSea(arrShip);



    ctrl.seaComp = gamePlaceFactory.createInstanceGamePlace('comp');
    ctrl.seaComp = ctrl.seaComp.setSeaInstall();
    ctrl.seaComp.InstallationOfShipsAtSea(arrShip);


    console.log(moveComp) ;



    ctrl.startGame = function () {
        var playerActiv = ctrl.getRandomInt(0,1);

       playerActiv === 1 ? ctrl.seaUser.setActiveBoard(true) :ctrl.seaComp.setActiveBoard(true);
        if (ctrl.seaUser.getActiveBoard()){

        }else if(ctrl.seaComp.getActiveBoard()){
            ctrl.compFire();
        }
            ctrl.game();

    };

    ctrl.game = function () {

        $rootScope.$on('fireToPosition', function (event, data){
            if (data.seaObject.fieldActive) {
                if (ctrl.seaUser.getActiveBoard()) {
                    ctrl.userFire(data);
                } else if (ctrl.seaComp.getActiveBoard()) {
                    ctrl.compFire();
                }
            }

        });


    };


    ctrl.userFire = function (pos) {

        console.log('fireuser');
        pos.seaObject.fieldActive = false;
        console.log(pos.seaObject);
        if (fireService.checkForMissOrHit(pos.seaObject.obj)) {

            fireService.toDestroyShip(pos.seaObject, pos.seaObject.obj, ctrl.seaComp);

            ctrl.seaUser.setActiveBoard(true);
            ctrl.seaComp.setActiveBoard(false);
        } else {
            pos.seaObject.obj = 'slip';
            console.log(2);
            ctrl.seaUser.setActiveBoard(false);
            ctrl.seaComp.setActiveBoard(true);
            ctrl.compFire();
        }


    };


    ctrl.compFire = function () {
        var stroke = true;

        while (stroke) {
            var count = ctrl.getRandomInt(0, 20);
            var posSea = ctrl.seaUser.getSeaInstall().getPolygon();


            if (posSea[count].fieldActive) {
                posSea[count].fieldActive = false;

                if (moveComp.getStatusProgress() === 'yes') {
                    fireService.finishOffAShip(ctrl.seaUser)

                } else {
                    if (fireService.checkForMissOrHit(posSea[count].obj)) {
                        var ship = posSea[count].obj;
                        moveComp.setId(posSea[count]);
                        moveComp.setObjShip(ship);
                        console.log(moveComp);

                        ctrl.seaComp.setActiveBoard(true);
                        ctrl.seaUser.setActiveBoard(false);
                        //console.log(posSea[count].obj);


                        fireService.toDestroyShip(posSea[count], posSea[count].obj, ctrl.seaUser);
                        console.log('tpp  ' + posSea[count].position.x + ' x ' + posSea[count].position.y);

                        if(ship.getIsKilled()) {
                            moveService.setStatusProgress('yes');
                        }


                    } else {
                        ctrl.seaComp.setActiveBoard(false);
                        ctrl.seaUser.setActiveBoard(true);
                        stroke = false;
                        posSea[count].obj = 'slip';
                        console.log('mimo  ' + posSea[count].position.x + ' x ' + posSea[count].position.y);
                    }
                }
            }
            else {
                console.log(0 + posSea[count].position.x + ' x ' + posSea[count].position.y);


            }

        }

    };





    ctrl.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


}

gameModeController.$inject = ['$rootScope','gamePlaceFactory','UserAPI','shipFactory','fireService','moveService'];
module.exports = gameModeController;