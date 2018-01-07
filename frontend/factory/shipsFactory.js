/**
 * Created by safon on 09.03.2017.
 */
 function shipFactory() {
    return {
        createInstanceShip: function () {
            return  new Ship()
        }
    };

    function Ship() {
        var self = this;


        // ToDo
        var identifierShip = null;
        var rotation = 0;
        var isKilled = true;
        var posArray = [], type = 'ship';

        self.getType = function () {
            return type;
        };


       self.setIdentifierShip = function (_identifierShip) {
           identifierShip = _identifierShip;
           return self;
       };
       self.getIdentifierShip = function () {
           return identifierShip;
       };

       self.setRotation = function (_rotation ) {
           rotation = _rotation;
           return self;
       };
       self.getRotation = function () {
           return rotation;
       };
       self.setIsKilled = function (_isKilled ) {
           isKilled = _isKilled;
           return self;
       };
       self.getIsKilled = function () {
           return isKilled
       };
       self.setPosArray = function (_posArray ) {
           posArray = _posArray;
           return self;
       };
       self.getPosArray = function () {
           return posArray;
       };

        // ship.setIdentifierShip(true).getIdentifierShip();





        self.generate = function (num, length) {

            var startX = 0;
            var startY = 0;
            var rot = 1;//getRandomInt(0,1);

                if (rot == 1) {  // Горизонтально
                    startX = 0;//getRandomInt(0,9);
                    startY = 0;//getRandomInt(0,10- length);
                }
                else { //Ветрикально
                    startX = getRandomInt(0,10 - length);
                    startY = getRandomInt(0,9);

                }
            var celId = {
                    position: {
                        x:startX ,
                        y: startY,
                        status: 'ship'
                    }
                };
            var cels = [celId];
            for (var i = 1; i < length; i++){
                celId = rot==0 ? ({position: { x: startX+i, y: startY,
                    status: 'ship'
                }
                }) : ({position: { x: startX, y: startY+i,
                    status: 'ship'
                    }
                });
                cels.push(celId);
            }


            self.setIdentifierShip(num + 'x' + length);
            self.setRotation(rot);
            self.setPosArray(cels) ;

        };

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }



    }


}

shipFactory.$inject = [];

module.exports = shipFactory;