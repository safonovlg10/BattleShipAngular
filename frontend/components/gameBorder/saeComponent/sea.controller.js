/**
 * Created by safon on 06.11.17.
 */
function SeaController (UserAPI,$scope,$rootScope) {
    var ctrl = this;
    ctrl.show = false;

ctrl.eventPositionSea = function (item) {

    $rootScope.$emit('fireToPosition', {
        seaObject: item

    });




}

}

SeaController.$inject = ["UserAPI",'$scope','$rootScope'];

module.exports  = SeaController;