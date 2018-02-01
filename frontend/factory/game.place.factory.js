/**
 * Created by safon on 08.11.17.
 */
function gamePlaceFactory(seaFactory,shipFactory) {
    return{
        createInstanceGamePlace: function (owner) {
            return  new GamePlace(owner)
        }

    };
    function GamePlace(owner) {
        var self = this;
        var seaInstall = null;
        var activeBoard = false;
        var isVictory = false;


       self.setSeaInstall = function () {
           seaInstall = seaFactory.createInstanceSeaObj(owner);
           return self;
       };
       self.getSeaInstall = function () {
           return seaInstall;
       };
       self.setActiveBoard = function (_activeBoard) {
             activeBoard = _activeBoard;
           return self;
       };

       self.getActiveBoard = function () {
           return activeBoard;
       };

       self.setIsVictory = function (victory) {
           isVictory = victory;
           return self;
       };
       self.getIsVictory = function () {
           return  isVictory;
       };



        self.InstallationOfShipsAtSea = function (arrShip) {
            var newShip;
            var flag = true;
            var arr = arrShip;
            for(var i = 0; i < arr.length; i++){
                flag = true;
                newShip = shipFactory.createInstanceShip();
                while(flag) {

                    newShip.generate(i, arr[i]);


                    if(seaInstall.validation(newShip)) {
                        if (seaInstall.validContactShip(newShip,seaInstall.getPolygon(),false)) {

                            seaInstall.setObjToPosition(newShip);

                            flag = false;
                        }
                    }


                }


            }


        }





    }
}

gamePlaceFactory.$inject = ['seaFactory','shipFactory'];

module.exports = gamePlaceFactory;