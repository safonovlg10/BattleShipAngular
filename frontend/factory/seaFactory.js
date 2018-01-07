/**
 * Created by safon on 03.11.17.
 */

function seaFactory() {
    return {
        createInstanceSeaObj: function (owner) {
            return new SeaObj (owner)
        }
    };

    function SeaObj(_owner) {
        var self = this;
        var polygon = [];
        var owner = _owner || null; // пользыватель


        initMatrix();
        self.setOwner = function (_owner) {
            owner = _owner;
            return self;
        };
        self.getOwner = function () {
            return owner;
        };

        self.getPolygon = function () {
            return polygon;
        };

        self.validation = function (obj) {
            var ship = obj.getPosArray();
            // console.error('ship',ship);

            for (var i = 0; i < ship.length; i++) {
                var pos = ship[i];
                // console.error('ship2',pos);

                for (var k = 0; k < polygon.length; k++) {
                    if (polygon[k].position.x === pos.position.x && polygon[k].position.y === pos.position.y) {

                        if (polygon[k].obj === null) { // исправить
                            return true;
                        }


                    }

                }
                return false;
            }
        };

        // размещение корабля
        self.setObjToPosition = function (obj) {
            var ship = obj.getPosArray();
            var pos;

            for (var i = 0; i < ship.length; i++) {
                pos = ship[i];
// console.error('errr',pos);
                for (var s = 0; s < polygon.length; s++) {

                    if (polygon[s].position.x === pos.position.x && polygon[s].position.y === pos.position.y) {
                        polygon[s].obj = obj;
                        polygon[s].shipId = pos;
                    }
                }


            }
        };

        self.validContactShip = function (obj, matrixObj,kill) {
            var ship = obj.getPosArray();
            var rotation = obj.getRotation();
            var pos;


            pos = ship[0];

            if (self.vlidMatrix(pos, rotation, ship.length, matrixObj,kill)) {
                return true;
            }


        };

        self.vlidMatrix = function (pos, rotation, length, matrixObj, kill) {
            var n = 0;
            var up = 0, c = 0, d = 0, l = 0, r = 0;
            // console.error('ship',pos);
            for (var s = 0; s < matrixObj.length; s++) {
                if (rotation == 1) {
                    if (matrixObj[s].position.x == pos.position.x && pos.position.y == matrixObj[s].position.y) {
                        if (matrixObj[s].position.y < 10 - length && matrixObj[s].position.y > 0 && matrixObj[s].position.x < 9 && matrixObj[s].position.x > 0) {

                            if(kill){
                                n = -1;
                                for ( up = -1; up <= length; up++) {
                                    polygon[s + n - 10].obj = 'slip';
                                    polygon[s + n - 10].fieldActive = false;
                                    n += 1;
                                }
                                n = -1;
                                for (c = -1; c <= length; c++) {

                                    if(matrixObj[s + n ].obj == null){
                                        polygon[s + n ].obj = 'slip';
                                        polygon[s + n ].fieldActive = false;
                                    }

                                    n += 1;
                                }

                                n = -1;
                                for (d = -1; d <= length; d++) {

                                    polygon[s + n + 10].obj = 'slip';
                                    polygon[s + n + 10].fieldActive = false;

                                    n += 1;
                                }

                            }else{

                                n = -1;
                                for ( up = -1; up <= length; up++) {
                                    if (matrixObj[s + n - 10].obj == null) {


                                    }
                                    else return false;
                                    n += 1;
                                }

                                n = -1;
                                for (c = -1; c <= length; c++) {
                                    if (matrixObj[s + n].obj == null) {


                                    }
                                    else return false;
                                    n += 1;
                                }

                                n = -1;
                                for (d = -1; d <= length; d++) {
                                    if (matrixObj[s + n + 10].obj == null) {


                                    }
                                    else return false;
                                    n += 1;
                                }
                                return true;

                            }


                        } else if (matrixObj[s].position.x == 0 && matrixObj[s].position.y == 0) {

                            if(kill){

                                n = 0;
                                for ( c = 0; c <= length; c++) {
                                    if (matrixObj[s + n].obj == null) {

                                            polygon[s + n ].obj = 'slip';
                                            polygon[s + n ].fieldActive = false;
                                        }

                                    n += 1;
                                }

                                n = 0;
                                for (d = 0; d <= length; d++) {

                                    polygon[s + n + 10].obj = 'slip';
                                    polygon[s + n + 10].fieldActive = false;
                                    n += 1;
                                }

                            }else {
                                n = 0;
                                for ( c = 0; c <= length; c++) {
                                    if (matrixObj[s + n].obj == null) {


                                    }
                                    else return false;
                                    n += 1;
                                }

                                n = 0;
                                for (d = 0; d <= length; d++) {
                                    if (matrixObj[s + n + 10].obj == null) {


                                    }
                                    else return false;
                                    n += 1;
                                }
                                return true;

                            }

                        } else if ((matrixObj[s].position.x > 0 && matrixObj[s].position.x < 9) && matrixObj[s].position.y > 0 && matrixObj[s].position.y < 10 - length) {


                            if (kill){

                                n = -1;
                                for ( c = -1; c <= length; c++) {
                                    if (matrixObj[s + n].obj == null) {


                                        polygon[s + n ].obj = 'slip';
                                        polygon[s + n ].fieldActive = false;
                                    }
                                    n += 1;
                                }

                                n = -1;
                                for (d = -1; d <= length; d++) {


                                        polygon[s + n + 10].obj = 'slip';
                                        polygon[s + n + 10].fieldActive = false;


                                    n += 1;
                                }

                            }else {
                                n = -1;
                                for ( c = -1; c <= length; c++) {
                                    if (matrixObj[s + n].obj == null) {


                                    }
                                    else return false;
                                    n += 1;
                                }

                                n = -1;
                                for (d = -1; d <= length; d++) {
                                    if (matrixObj[s + n + 10].obj == null) {



                                    }
                                    else return false;
                                    n += 1;
                                }
                                return true;


                            }

                        } else if (matrixObj[s].position.y == 10 - length && matrixObj[s].position.x < 1) {

                            if (kill){

                                n = -1;
                                for (c = -1; c < length; c++) {
                                    if (matrixObj[s + n].obj == null) {

                                        polygon[s + n ].obj = 'slip';
                                        polygon[s + n ].fieldActive = false;
                                    }

                                    n += 1;
                                }

                                n = -1;
                                for (d = -1; d < length; d++) {

                                    polygon[s + n + 10].obj = 'slip';
                                    polygon[s + n + 10].fieldActive = false;


                                    n += 1;
                                }

                            }else {

                                n = -1;
                                for (c = -1; c < length; c++) {
                                    if (matrixObj[s + n].obj == null) {


                                    }
                                    else return false;
                                    n += 1;
                                }

                                n = -1;
                                for (d = -1; d < length; d++) {
                                    if (matrixObj[s + n + 10].obj == null) {



                                    }
                                    else return false;
                                    n += 1;
                                }
                                return true;



                            }








                        } else if (matrixObj[s].position.y < 1 && (matrixObj[s].position.x < 9 && matrixObj[s].position.x > 0)) {

                            if(kill){
                                n = 0;
                                for (up = 0; up <= length; up++) {

                                        polygon[s + n - 10].obj = 'slip';
                                        polygon[s + n - 10].fieldActive = false;

                                        n += 1;
                                }

                                n = 0;
                                for (c = 0; c <= length; c++) {
                                    if (matrixObj[s + n].obj == null) {


                                        polygon[s + n ].obj = 'slip';
                                        polygon[s + n ].fieldActive = false;

                                    }

                                    n += 1;
                                }

                                n = 0;
                                for ( d = 0; d <= length; d++) {

                                    polygon[s + n + 10].obj = 'slip';
                                    polygon[s + n + 10].fieldActive = false;

                                    n += 1;
                                }
                            }else {

                                n = 0;
                                for (up = 0; up <= length; up++) {
                                    if (matrixObj[s + n - 10].obj == null) {


                                    }
                                    else return false;
                                    n += 1;
                                }
                                n = 0;
                                for (c = 0; c <= length; c++) {
                                    if (matrixObj[s + n].obj == null) {


                                    }
                                    else return false;
                                    n += 1;
                                }

                                n = 0;
                                for ( d = 0; d <= length; d++) {
                                    if (matrixObj[s + n + 10].obj == null) {


                                    }
                                    else return false;
                                    n += 1;
                                }
                                return true;

                            }

                        } else if (matrixObj[s].position.y == 10 - length && (matrixObj[s].position.x < 9 && matrixObj[s].position.x > 0)) {


                            if (kill){
                                n = -1;
                                for (up = -1; up < length; up++) {

                                    polygon[s + n - 10].obj = 'slip';
                                    polygon[s + n - 10].fieldActive = false;

                                    n += 1;
                                }

                                n = -1;
                                for (c = -1; c < length; c++) {
                                    if (matrixObj[s + n].obj == null) {


                                        polygon[s + n ].obj = 'slip';
                                        polygon[s + n ].fieldActive = false;

                                    }

                                    n += 1;
                                }


                                n = -1;
                                for (d = -1; d < length; d++) {

                                    polygon[s + n + 10].obj = 'slip';
                                    polygon[s + n + 10].fieldActive = false;
                                    n += 1;
                                }

                            }else {

                                n = -1;
                                for (up = -1; up < length; up++) {
                                    if (matrixObj[s + n - 10].obj == null) {


                                    }
                                    else return false;
                                    n += 1;
                                }
                                n = -1;
                                for (c = -1; c < length; c++) {
                                    if (matrixObj[s + n].obj == null) {


                                    }
                                    else return false;
                                    n += 1;
                                }

                                n = -1;
                                for (d = -1; d < length; d++) {
                                    if (matrixObj[s + n + 10].obj == null) {


                                    }
                                    else return false;
                                    n += 1;
                                }
                                return true;

                            }

                        }
                        else if (matrixObj[s].position.x == 9 && matrixObj[s].position.y == 0) {


                            if (kill){

                                n = 0;
                                for (up = 0; up <= length; up++) {

                                    polygon[s + n - 10].obj = 'slip';
                                    polygon[s + n - 10].fieldActive = false;
                                    n += 1;
                                }

                                n = 0;
                                for (c = 0; c <= length; c++) {
                                    if (matrixObj[s + n].obj == null) {

                                        polygon[s + n ].obj = 'slip';
                                        polygon[s + n ].fieldActive = false;

                                    }

                                    n += 1;
                                }

                            }else {

                                n = 0;
                                for (up = 0; up <= length; up++) {
                                    if (matrixObj[s + n - 10].obj == null) {



                                    }
                                    else return false;
                                    n += 1;
                                }
                                n = 0;
                                for (c = 0; c <= length; c++) {
                                    if (matrixObj[s + n].obj == null) {


                                    }
                                    else return false;
                                    n += 1;
                                }
                                return true;

                            }

                        } else if (matrixObj[s].position.x == 9 && matrixObj[s].position.y == 10 - length) {

                            if(kill){
                                n = -1;
                                for ( up = 0; up <= length; up++) {

                                    polygon[s + n - 10].obj = 'slip';
                                    polygon[s + n - 10].fieldActive = false;

                                    n += 1;
                                }
                                n = -1;
                                for (c = 0; c <= length; c++) {
                                    if (matrixObj[s + n].obj == null) {

                                        polygon[s + n ].obj = 'slip';
                                        polygon[s + n ].fieldActive = false;

                                    }

                                    n += 1;
                                }
                            }else {


                                n = -1;
                                for ( up = 0; up <= length; up++) {
                                    if (matrixObj[s + n - 10].obj == null) {


                                    }
                                    else return false;
                                    n += 1;
                                }
                                n = -1;
                                for (c = 0; c <= length; c++) {
                                    if (matrixObj[s + n].obj == null) {


                                    }
                                    else return false;
                                    n += 1;
                                }
                                return true;

                            }


                        } else if (matrixObj[s].position.x == 9 && matrixObj[s].position.y > 0 && matrixObj[s].position.y < 10 - length) {

                            if (kill){
                                n = -1;
                                for ( up = -1; up <= length; up++) {

                                    polygon[s + n - 10].obj = 'slip';
                                    polygon[s + n - 10].fieldActive = false;
                                    n += 1;
                                }

                                n = -1;
                                for (c = -1; c <= length; c++) {
                                    if (matrixObj[s + n].obj == null) {

                                        polygon[s + n ].obj = 'slip';
                                        polygon[s + n ].fieldActive = false;
                                    }

                                    n += 1;
                                }
                            }else {

                                n = -1;
                                for ( up = -1; up <= length; up++) {
                                    if (matrixObj[s + n - 10].obj == null) {



                                    }
                                    else return false;
                                    n += 1;
                                }
                                n = -1;
                                for (c = -1; c <= length; c++) {
                                    if (matrixObj[s + n].obj == null) {



                                    }
                                    else return false;
                                    n += 1;
                                }
                                return true;

                            }

                        }
                        else {
                            return false;
                        }
                    }
                } else if (rotation == 0) {
                    if (matrixObj[s].position.x == pos.position.x && pos.position.y == matrixObj[s].position.y) {
                        if (matrixObj[s].position.x == 0 && matrixObj[s].position.y == 0) {

                            if(kill){
                                n = 0;
                                for ( r = 0; r <= length; r++) {


                                    polygon[s + n + 1].obj = 'slip';
                                    polygon[s + n + 1].fieldActive = false;

                                    n += 10;


                                }
                                n = 0;
                                for (c = 0; c <= length; c++) {


                                    if (matrixObj[s + n].obj == null) {
                                        polygon[s + n].obj = 'slip';
                                        polygon[s + n].fieldActive = false;
                                    }

                                    n += 10;
                                }


                            }else {
                                n = 0;
                                for ( r = 0; r <= length; r++) {

                                    if (matrixObj[s + n + 1].obj == null) {


                                    }
                                    else return false;
                                    n += 10;


                                }
                                n = 0;
                                for (c = 0; c <= length; c++) {


                                    if (matrixObj[s + n].obj == null) {


                                    }
                                    else return false;
                                    n += 10;
                                }


                                return true;


                            }


                        } else if (matrixObj[s].position.x == 0 && matrixObj[s].position.y == 9) {

                            if (kill){
                                n = 0;
                                for (l = 0; l <= length; l++) {

                                        polygon[s + n -1].obj = 'slip';
                                        polygon[s + n -1].fieldActive = false;

                                    n += 10;

                                }
                                n = 0;
                                for (c = 0; c <= length; c++) {


                                    if (matrixObj[s + n].obj == null) {
                                        polygon[s + n].obj = 'slip';
                                        polygon[s + n].fieldActive = false;
                                    }

                                    n += 10;
                                }

                            }else {
                                n = 0;
                                for (l = 0; l <= length; l++) {

                                    if (matrixObj[s + n - 1].obj == null) {


                                    }
                                    else return false;
                                    n += 10;


                                }
                                n = 0;
                                for (c = 0; c <= length; c++) {


                                    if (matrixObj[s + n].obj == null) {


                                    }
                                    else return false;
                                    n += 10;
                                }


                                return true;

                            }


                        } else if ((matrixObj[s].position.y > 0 || matrixObj[s].position.y < 9) && matrixObj[s].position.x == 0) {

                            if(kill){
                                n = 0;
                                for ( l = 0; l <= length; l++) {

                                    polygon[s + n - 1].obj = 'slip';
                                    polygon[s + n - 1].fieldActive = false;

                                    n += 10;


                                }
                                n = 0;
                                for (c = 0; c <= length; c++) {

                                    if (matrixObj[s + n].obj == null) {
                                        polygon[s + n].obj = 'slip';
                                        polygon[s + n].fieldActive = false;
                                    }

                                    n += 10;

                                }
                                n = 0;
                                for ( r = 0; r <= length; r++) {

                                    polygon[s + n + 1].obj = 'slip';
                                    polygon[s + n + 1].fieldActive = false;

                                    n += 10;

                                }


                            }else {

                                n = 0;
                                for ( l = 0; l <= length; l++) {

                                    if (matrixObj[s + n - 1].obj == null) {


                                    }
                                    else return false;
                                    n += 10;


                                }
                                n = 0;
                                for (c = 0; c <= length; c++) {

                                    if (matrixObj[s + n].obj == null) {


                                    }
                                    else return false;
                                    n += 10;

                                }
                                n = 0;
                                for ( r = 0; r <= length; r++) {

                                    if (matrixObj[s + n + 1].obj == null) {


                                    }
                                    else return false;
                                    n += 10;


                                }


                                return true;

                            }


                        }
                        else if (matrixObj[s].position.y == 0 && matrixObj[s].position.x == 10 - length) {

                            if (kill){
                                n = -10;
                                for (c = 0; c <= length; c++) {


                                    if (matrixObj[s + n].obj == null) {
                                        polygon[s + n].obj = 'slip';
                                        polygon[s + n].fieldActive = false;
                                    }

                                    n += 10;

                                }
                                n = -10;
                                for (r = 0; r <= length; r++) {

                                    polygon[s + n + 1].obj = 'slip';
                                    polygon[s + n + 1].fieldActive = false;

                                    n += 10;

                                }


                            }else {

                                n = -10;
                                for (c = 0; c <= length; c++) {


                                    if (matrixObj[s + n].obj == null) {


                                    }
                                    else return false;
                                    n += 10;

                                }
                                n = -10;
                                for (r = 0; r <= length; r++) {

                                    if (matrixObj[s + n + 1].obj == null) {


                                    }
                                    else return false;
                                    n += 10;

                                }

                                return true;

                            }


                        }
                        else if (matrixObj[s].position.y == 0 && matrixObj[s].position.x > 0 && matrixObj[s].position.x < 10 - length) {

                            if (kill){

                                n = -10;
                                for (c = -1; c <= length; c++) {


                                    if (matrixObj[s + n].obj == null) {
                                        polygon[s + n].obj = 'slip';
                                        polygon[s + n].fieldActive = false;

                                    }

                                    n += 10;
                                }
                                n = -10;
                                for (r = -1; r <= length; r++) {


                                    polygon[s + n + 1].obj = 'slip';
                                    polygon[s + n + 1].fieldActive = false;

                                    n += 10;


                                }


                            }else {

                                n = -10;
                                for (c = -1; c <= length; c++) {


                                    if (matrixObj[s + n].obj == null) {


                                    }
                                    else return false;
                                    n += 10;
                                }
                                n = -10;
                                for (r = -1; r <= length; r++) {

                                    if (matrixObj[s + n + 1].obj == null) {


                                    }
                                    else return false;
                                    n += 10;


                                }

                                return true;

                            }

                        }

                        else if (matrixObj[s].position.x == 10 - length && ( matrixObj[s].position.y > 0 && matrixObj[s].position.y < 9)) {

                            if (kill){

                                n = -10;
                                for (l = 0; l <= length; l++) {


                                    polygon[s + n - 1].obj = 'slip';
                                    polygon[s + n - 1].fieldActive = false;

                                    n += 10;


                                }
                                n = -10;
                                for (c = 0; c <= length; c++) {


                                    if (matrixObj[s + n].obj == null) {
                                        polygon[s + n].obj = 'slip';
                                        polygon[s + n].obj.fieldActive = false;

                                    }

                                    n += 10;

                                }
                                n = -10;
                                for (r = 0; r <= length; r++) {


                                    polygon[s + n + 1].obj = 'slip';
                                    polygon[s + n + 1].fieldActive = false;

                                    n += 10;


                                }




                            }else {

                                n = -10;
                                for (l = 0; l <= length; l++) {

                                    if (matrixObj[s + n - 1].obj == null) {


                                    }
                                    else return false;
                                    n += 10;


                                }
                                n = -10;
                                for (c = 0; c <= length; c++) {


                                    if (matrixObj[s + n].obj == null) {


                                    }
                                    else return false;
                                    n += 10;

                                }
                                n = -10;
                                for (r = 0; r <= length; r++) {

                                    if (matrixObj[s + n + 1].obj == null) {


                                    }
                                    else return false;
                                    n += 10;


                                }


                                return true;

                            }


                        }
                        else if (matrixObj[s].position.x == 10 - length && matrixObj[s].position.y == 9) {


                            if(kill){

                                n = -10;
                                for ( l = 0; l <= length; l++) {


                                    polygon[s + n - 1].obj = 'slip';
                                    polygon[s + n - 1].fieldActive = false;

                                    n += 10;


                                }
                                n = -10;
                                for (c = 0; c <= length; c++) {


                                    if (matrixObj[s + n].obj == null) {
                                        polygon[s + n].obj = 'slip';
                                        polygon[s + n].fieldActive = false;

                                    }

                                    n += 10;

                                }


                                return true;

                            }else {

                                n = -10;
                                for ( l = 0; l <= length; l++) {

                                    if (matrixObj[s + n - 1].obj == null) {


                                    }
                                    else return false;
                                    n += 10;


                                }
                                n = -10;
                                for (c = 0; c <= length; c++) {


                                    if (matrixObj[s + n].obj == null) {


                                    }
                                    else return false;
                                    n += 10;

                                }


                                return true;

                            }


                        }
                        else if (matrixObj[s].position.x > 0 && matrixObj[s].position.x < 10 - length && matrixObj[s].position.y == 9) {

                            if(kill){

                                n = -10;
                                for (l = -1; l <= length; l++) {


                                    polygon[s + n - 1].obj = 'slip';
                                    polygon[s + n - 1].fieldActive = false;

                                    n += 10;

                                }
                                n = -10;
                                for (c = -1; c <= length; c++) {


                                    if (matrixObj[s + n].obj == null) {
                                        polygon[s + n].obj = 'slip';
                                        polygon[s + n].fieldActive = false;

                                    }

                                    n += 10;

                                }


                                return true;


                            }else {

                                n = -10;
                                for (l = -1; l <= length; l++) {

                                    if (matrixObj[s + n - 1].obj == null) {


                                    }
                                    else return false;
                                    n += 10;

                                }
                                n = -10;
                                for (c = -1; c <= length; c++) {


                                    if (matrixObj[s + n].obj == null) {


                                    }
                                    else return false;
                                    n += 10;

                                }

                                return true;

                            }


                        }
                        else if ((matrixObj[s].position.x > 0 && matrixObj[s].position.x < 10 - length ) &&
                            (matrixObj[s].position.y > 0 || matrixObj[s].position.y < 9 )) {

                            if (kill){

                                n = -10;

                                for (l = -1; l <= length; l++) {


                                    polygon[s + n - 1].obj = 'slip';
                                    polygon[s + n - 1].fieldActive = false;

                                    n += 10;


                                }
                                n = -10;
                                for (c = -1; c <= length; c++) {


                                    if (matrixObj[s + n].obj == null) {
                                        polygon[s + n].obj = 'slip';
                                        polygon[s + n].fieldActive = false;

                                    }

                                    n += 10;


                                }
                                n = -10;
                                for ( r = -1; r <= length; r++) {


                                    polygon[s + n + 1].obj = 'slip';
                                    polygon[s + n + 1].fieldActive = false;


                                    n += 10;


                                }

                                return true;

                            }else {


                                n = -10;

                                for (l = -1; l <= length; l++) {

                                    if (matrixObj[s + n - 1].obj == null) {


                                    }
                                    else return false;
                                    n += 10;


                                }
                                n = -10;
                                for (c = -1; c <= length; c++) {


                                    if (matrixObj[s + n].obj == null) {


                                    }
                                    else return false;
                                    n += 10;


                                }
                                n = -10;
                                for ( r = -1; r <= length; r++) {

                                    if (matrixObj[s + n + 1].obj == null) {



                                    }
                                    else return false;
                                    n += 10;


                                }

                                return true;


                            }


                        }
                        else {
                            return false;
                        }

                    }

                }


            }

        };




        function initMatrix() {

            for (var x = 0; x < 10; x++) {
                for (var y = 0; y < 10; y++) {
                    polygon.push({position: {x: x, y: y}, shipId: null, obj: null, moveShip: null, fieldActive: true});
                }
            }
        }
    }

}

seaFactory.$inject = [];

module.exports = seaFactory;