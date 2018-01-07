/**
 * Created by safon on 11.11.17.
 */
function move() {
    var self = this;

    var id = null;
    var  obj = null;
    var statusProgress = 'no';


    self.setId = function (_id) {
        id = _id
    };
    self.getId = function () {
        return id

    };
    self.setObjShip = function (_obj) {
        obj = _obj
    };
    self.getObjShip  = function () {
        return obj

    };

    self.setStatusProgress = function (_statusProgress) {
        statusProgress = _statusProgress
    };
    self.getStatusProgress = function () {
        return statusProgress

    }

}

module.exports = move;