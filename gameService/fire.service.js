/**
 * Created by safon on 10.11.17.
 */
function fireService(bloomer, seaFactory, moveService) {


    this.checkForMissOrHit = function (objSea) {


        if (objSea === null || objSea === 'slip') {
            return false;

        }
        else {

            return true;
        }


    };

    this.countingOfDeadShips = function (shipUser, objUser) {

        for (var i = 0; i < shipUser.length; i++ ){
           if(shipUser[i].getIsKilled() ) {
               console.log('карабли еще есть ' + shipUser[i].getIsKilled());
               return false;

           }else {
                objUser.setIsVictory(true);
               console.log('карабли больше нет ');

           }
        }
        return true;

    };




    this.checkIsKilled = function (obj) {
        var count = 0;

        var objPos = obj.getPosArray();
        for (var i = 0; i < objPos.length; i++) {
            if (objPos[i].position.status === 'hit') {
                count++;
            }

        }
        if (count === objPos.length) {

            for (var i = 0; i < objPos.length; i++) {

                objPos[i].position.status = 'kill';

            }
            obj.setIsKilled(false);
            return true;

        }


    };


    this.checkRouteToShot = function (idSea, checkPos) {
//вниз = 1, вверх = 3, право = 4, лево = 2

        var route = null;

        if (idSea.x === 0 && idSea.y === 0) {  //1
            if (checkPos) {
                return true;
            }
            route = getRandomInt(1, 2);
            console.log(route);

            return route == 2 ? 4 : 1;
        } else if (idSea.x === 0 && (idSea.y > 0 || idSea < 9)) {  //8
            if (checkPos) {
                return true;
            }
            route = getRandomInt(1, 3);
            console.log(route);

            return route == 3 ? 4 : route;
        } else if ((idSea.x > 0 && idSea.x < 9) && (idSea.y > 0 || idSea < 9)) { //9
            if (checkPos) {
                return true;
            }
            route = getRandomInt(1, 4);
            console.log(route);

            return route;
        } else if ((idSea.x > 0 && idSea.x < 9) && idSea.y === 0) { //2
            if (checkPos) {
                return true;
            }
            route = getRandomInt(1, 3);
            console.log(route);

            return route == 2 ? 4 : route;

        } else if (idSea.x === 9 && idSea.y === 0) { //3
            if (checkPos) {
                return true;
            }
            route = getRandomInt(1, 2);
            console.log(route);

            return route == 1 ? 3 : 4;
        } else if (idSea.x === 9 && (idSea.y > 0 && idSea.y < 9)) { //4
            if (checkPos) {
                return true;
            }
            route = getRandomInt(1, 3);
            console.log(route);

            return route == 1 ? 4 : route;
        } else if (idSea.x === 9 && idSea.y == 9) { //5
            if (checkPos) {
                return true;
            }
            route = getRandomInt(2, 3);
            console.log(route);

            return route;
        } else if ((idSea.x > 0 && idSea.x < 9) && idSea.y === 9) { //6
            if (checkPos) {
                return true;
            }
            route = getRandomInt(1, 3);
            console.log(route);

            return route;
        } else if (idSea.x === 0 && idSea.y === 9) { // 7
            if (checkPos) {
                return true;
            }
            route = getRandomInt(1, 2);
            console.log(route);

            return route;
        }

    };


    this.finishOffAShip = function (objMatrixArr, objSeaUser, objSeaComp) {
        var route = null;
        var n = null, c = null;

        //console.log(moveService.getId());


        if (!moveService.getReverse()) {
            route = this.checkRouteToShot(moveService.getId().position, false);
        } else {
            route = moveService.getDirection();
            // console.log('делаю реверс');
        }


        if (route == 4) {  //вправо
            for (var i = 0; i < objMatrixArr.length; i++) {

                if (objMatrixArr[i].position.x === moveService.getId().position.x && objMatrixArr[i].position.y === moveService.getId().position.y) {


                    console.log('check   ' + objMatrixArr[i].position.x + '  ' + moveService.getId().position.x);

                    var toggleRight;
                    for (c = 1; c < 5; c++) {

                        if (objMatrixArr[i + c].obj == 'slip') {
                            console.log('астоновка цыкла при не правильном напровление ' + route);
                            return true;
                        }

                        if (objMatrixArr[i + c].obj != null && objMatrixArr[i + c].obj !== 'slip' && objMatrixArr[i + c].obj !== 'hit') {

                            objMatrixArr[i + c].fieldActive = false;  //переставить флаг поле на не активное.

                            toggleRight = this.toDestroyShip(objMatrixArr[i + c], moveService.getObjShip(), objSeaUser);
                            if (toggleRight == null) {
                                moveService.setReverse(true);
                                moveService.setDirection(2);
                                if (moveService.getId().position.y == 9) {

                                    console.log('астоновка цыкла при убистви ' + route);
                                    return true;
                                }
                            }
                            else {
                                moveService.setStatusProgress('no');
                                moveService.setReverse(false);
                                return true;
                            }


                        } else {


                            // if (objMatrixArr[i + c].obj == null) {


                            objSeaComp.setActiveBoard(false);
                            objSeaUser.setActiveBoard(true);
                            // if(!this.checkIsKilled(moveService.getObjShip())){
                            //     moveService.setReverse(true);
                            //     moveService.setDirection(2);
                            // }
                            // else {
                            //     moveService.setStatusProgress('no');
                            //     moveService.setReverse(false);
                            //     break;
                            // }

                            if (moveService.getId().position.y == 9) {

                                console.log('астоновка цыкла ромахе' + route);
                                return true;
                            }

                            objMatrixArr[i + c].fieldActive = false;
                            objMatrixArr[i + c].obj = 'slip';
                            console.log('promax is service ' + objMatrixArr[i + c].position.x + ' x ' + objMatrixArr[i + c].position.y);
                            console.log(moveService.getObjShip());


                            return false;

                            // }
                            // return false;
                        }


                    }

                }


            }

        } else if (route == 1) {  //вниз
            for (var i = 0; i < objMatrixArr.length; i++) {

                if (objMatrixArr[i].position.x === moveService.getId().position.x && objMatrixArr[i].position.y === moveService.getId().position.y) {


                    console.log('check   ' + objMatrixArr[i].position.x + '  ' + moveService.getId().position.x);


                    n = 0;
                    var toggleDown;
                    for (c = 0; c < 5; c++) {

                        n += 10;

                        if (objMatrixArr[i + n].obj == 'slip') {
                            console.log('астоновка цыкла при не правильном напровление ' + route);
                            return true;
                        }
                        if (objMatrixArr[i + n].obj != null && objMatrixArr[i + n].obj != 'slip' && objMatrixArr[i + n].obj != 'hit') {
                            objMatrixArr[i + n].fieldActive = false;  //переставить флаг поле на не активное.

                            toggleDown = this.toDestroyShip(objMatrixArr[i + n], moveService.getObjShip(), objSeaUser);
                            if (toggleDown == null) {
                                moveService.setReverse(true);
                                moveService.setDirection(3);
                                if (moveService.getId().position.x == 9) {

                                    console.log('астоновка цыкла при убистви ' + route);
                                    return true;
                                }
                            }
                            else {
                                moveService.setStatusProgress('no');
                                moveService.setReverse(false);
                                return true;
                            }


                        } else {


                            // if (objMatrixArr[i + c].obj == null) {
                            objSeaComp.setActiveBoard(false);
                            objSeaUser.setActiveBoard(true);
                            // if(!this.checkIsKilled(moveService.getObjShip())){
                            //     moveService.setReverse(true);
                            //     moveService.setDirection(2);
                            // }
                            // else {
                            //     moveService.setStatusProgress('no');
                            //     moveService.setReverse(false);
                            //     break;
                            // }

                            if (moveService.getId().position.x == 9) {

                                console.log('астоновка цыкла ромахе' + route);
                                return true;
                            }

                            objMatrixArr[i + n].fieldActive = false;
                            objMatrixArr[i + n].obj = 'slip';
                            console.log('promax is service ' + objMatrixArr[i + n].position.x + ' x ' + objMatrixArr[i + n].position.y);
                            console.log(moveService.getObjShip());


                            return false;

                            // }
                            // return false;
                        }

                    }


                }


            }
        } else if (route == 2) {  //лево
            for (var i = 0; i < objMatrixArr.length; i++) {

                if (objMatrixArr[i].position.x === moveService.getId().position.x && objMatrixArr[i].position.y === moveService.getId().position.y) {


                    console.log('check   ' + objMatrixArr[i].position.x + '  ' + moveService.getId().position.x);

                    var toggleLeft;
                    for (c = 1; c < 5; c++) {

                        if (objMatrixArr[i - c].obj == 'slip') {
                            console.log('астоновка цыкла при не правильном напровление ' + route);
                            return true;
                        }
                        if (objMatrixArr[i - c].obj != null && objMatrixArr[i - c].obj !== 'slip' && objMatrixArr[i - c].obj !== 'hit') {

                            objMatrixArr[i - c].fieldActive = false;  //переставить флаг поле на не активное.

                            toggleLeft = this.toDestroyShip(objMatrixArr[i - c], moveService.getObjShip(), objSeaUser);
                            if (toggleLeft == null) {
                                moveService.setReverse(true);
                                moveService.setDirection(4);
                                if (moveService.getId().position.y == 0) {

                                    console.log('астоновка цыкла при убистви ' + route);
                                    return true;
                                }
                            } else {
                                moveService.setStatusProgress('no');
                                moveService.setReverse(false);
                                return true;
                            }


                        } else {

                            // if (objMatrixArr[i + c].obj == null) {
                            objSeaComp.setActiveBoard(false);
                            objSeaUser.setActiveBoard(true);

                            if (moveService.getId().position.y == 0) {

                                console.log('астоновка цыкла ромахе' + route);
                                return true;
                            }

                            objMatrixArr[i - c].fieldActive = false;
                            objMatrixArr[i - c].obj = 'slip';
                            console.log('promax is service ' + objMatrixArr[i - c].position.x + ' x ' + objMatrixArr[i - c].position.y);
                            console.log(moveService.getObjShip());


                            return false;

                            // }
                            // return false;
                        }


                    }

                }


            }

        } else if (route == 3) {  //вверх
            for (var i = 0; i < objMatrixArr.length; i++) {

                if (objMatrixArr[i].position.x === moveService.getId().position.x && objMatrixArr[i].position.y === moveService.getId().position.y) {


                    console.log('check   ' + objMatrixArr[i].position.x + '  ' + moveService.getId().position.x);

                    var toggleUp;
                    n = 0;

                    for (c = 1; c < 5; c++) {
                        n += 10;
                        if (objMatrixArr[i - n].obj == 'slip') {
                            console.log('астоновка цыкла при не правильном напровление ' + route);
                            return true;
                        }
                        if (objMatrixArr[i - n].obj != null && objMatrixArr[i - n].obj !== 'slip' && objMatrixArr[i - n].obj !== 'hit') {

                            objMatrixArr[i - n].fieldActive = false;  //переставить флаг поле на не активное.

                            toggleUp = this.toDestroyShip(objMatrixArr[i - n], moveService.getObjShip(), objSeaUser);
                            if (toggleUp == null) {
                                moveService.setReverse(true);
                                moveService.setDirection(1);
                                if (moveService.getId().position.x == 0) {

                                    console.log('астоновка цыкла при убистви ' + route);
                                    return true;
                                }
                            }
                            else {
                                moveService.setStatusProgress('no');
                                moveService.setReverse(false);
                                return true;
                            }


                        } else {
                            // if (objMatrixArr[i + c].obj == null) {

                            objSeaComp.setActiveBoard(false);
                            objSeaUser.setActiveBoard(true);

                            if (moveService.getId().position.x == 0) {

                                console.log('астоновка цыкла ромахе' + route);
                                return true;
                            }

                            objMatrixArr[i - n].fieldActive = false;
                            objMatrixArr[i - n].obj = 'slip';
                            console.log('promax is service ' + objMatrixArr[i - n].position.x + ' x ' + objMatrixArr[i - n].position.y);
                            console.log(moveService.getObjShip());


                            return false;

                            // }
                            // return false;
                        }

                    }

                }


            }

        }


    };


    this.toDestroyShip = function (objSeaPosition, objShip, objMatrix) {
        var kill = null;
        var posSea = objSeaPosition.position, posShip = objShip.getPosArray();
        var newBloomer = bloomer.creat();
        for (var i = 0; i < posShip.length; i++) {
            if (posSea.x === posShip[i].position.x && posSea.y === posShip[i].position.y) {
                posShip[i].position.status = 'hit';
                if (this.checkIsKilled(objShip)) {
                    objMatrix.getSeaInstall().validContactShip(objShip, objMatrix.getSeaInstall().getPolygon(), true);
                    kill = true;
                }
                // objSeaPosition.obj = newBloomer;

            }
        }
        return kill;

    };

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    return {
        checkForMissOrHit: this.checkForMissOrHit,
        toDestroyShip: this.toDestroyShip,
        checkIsKilled: this.checkIsKilled,
        finishOffAShip: this.finishOffAShip,
        checkRouteToShot: this.checkRouteToShot,
        countingOfDeadShips: this.countingOfDeadShips
    }


}

fireService.$inject = ['bloomer', 'seaFactory', 'moveService'];

module.exports = fireService;