/**
 * Created by safon on 11.11.17.
 */
function move() {
    var self = this;

    var id = null;
    var obj = null;
    var statusProgress = 'no';
    var reverseObj = {
        reverse: false,
        direction: null
    };


    self.setId = function (_id) {
        id = _id;
    };
    self.getId = function () {
        return id;

    };
    self.setObjShip = function (_obj) {
        obj = _obj;
    };
    self.getObjShip  = function () {
        return obj;

    };

    self.setStatusProgress = function (_statusProgress) {
        statusProgress = _statusProgress;
    };
    self.getStatusProgress = function () {
        return statusProgress;

    };

    self.setReverse = function (_reverse) {
        reverseObj.reverse = _reverse;
    };
    self.setDirection = function (_direction) {
        reverseObj.direction = _direction;
    };
    self.getReverse = function () {
        return reverseObj.reverse;

    };
    self.getDirection = function () {
        return reverseObj.direction;

    };

}

module.exports = move;