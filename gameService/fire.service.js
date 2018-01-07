/**
 * Created by safon on 10.11.17.
 */
function fireService(bloomer,seaFactory, moveService) {


    this.checkForMissOrHit = function (objSea) {


       // console.log(objSea);


            if (objSea === null || objSea === 'slip'){
                return false;

            }
            else {
               // console.log(objSea);
                return true;
            }



        // if (objSea.seaObject.fieldActive === true){
        //     return false;
        // }
        // else {
        //     objSea.seaObject.fieldActive = true;
        //
        //     if (objSea.seaObject.obj.getType() === 'ship'){ // есть ли корабель
        //         console.log(objSea);
        //         if(objShip.getIsKilled()){ //жив ли карабель
        //             this.toDestroyShip(objSea.seaObject,objShip);//подбитие палубы
        //             if(objShip.getIsKilled()){
        //                 return true;
        //                 // move();
        //             }else {
        //                 // move();
        //                 return false;
        //             }
        //
        //
        //
        //
        //         }else {
        //             // move();
        //             return false;
        //         }
        //
        //     }else {
        //         // move();
        //         return false;
        //
        //     }
        //
        //
        // }


    };

    this.checkIsKilled = function (obj) {
        var count = 0;

        var objPos = obj.getPosArray();
        for(var i = 0; i < objPos.length; i++){
            if(objPos[i].position.status === 'hit'){
                count++;
            }

        }
        if(count === objPos.length){
            obj.setIsKilled(false);
            return true;

        }


    };




    this.checkRouteToShot = function (idSea) {


        var route = null;

        if(idSea.x === 0 && idSea.y === 0){
            route = getRandomInt(1,2);
            console.log(route);

            return route == 2? 2: 4;
        }
        
    };


    this.finishOffAShip = function (objMatrix) {
var route = null;
var  n = null,  c = null;
            console.log('o999991111<<<<<<<');
        console.log(moveService.getId());

            route = this.checkRouteToShot(moveService.getId().position);

if (route == 4){

    n = 0;
    for ( c = 0; c <= 4; c++) {
        this.toDestroyShip()
        n += 1;
    }


}



            for (var i = 0; i < moveService.getObjShip().getPosArray().length ; i++){
               var pos = moveService.getObjShip().getPosArray()[i];
               if(pos.position.status == 'ship'){
                  this.toDestroyShip(moveService.getId(),moveService.getObjShip(),objMatrix)
               }
                console.log(pos);
            }

            moveService.setStatusProgress('no');

        
    };



    this.toDestroyShip = function (objSeaPosition,objShip,objMatrix) {

        var posSea = objSeaPosition.position, posShip = objShip.getPosArray();
        var newBloomer = bloomer.creat();
        for (var i = 0; i < posShip.length; i++){
            if(posSea.x === posShip[i].position.x && posSea.y  === posShip[i].position.y){
                posShip[i].position.status = 'hit';
                if (this.checkIsKilled(objShip)){
                    objMatrix.getSeaInstall().validContactShip(objShip,objMatrix.getSeaInstall().getPolygon(),true);

                }
                objSeaPosition.obj = newBloomer;

            }
        }


    };
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    return {
        checkForMissOrHit:  this.checkForMissOrHit,
        toDestroyShip: this.toDestroyShip,
        checkIsKilled: this.checkIsKilled,
        finishOffAShip: this.finishOffAShip,
        checkRouteToShot: this.checkRouteToShot
    }



}
fireService.$inject = ['bloomer','seaFactory','moveService'];

module.exports = fireService;