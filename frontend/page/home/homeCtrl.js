/**
 * Created by safon on 10.09.17.
 */


function HomeController(UserAPI, $rootScope, $scope) {
var $ctrl = this;
$ctrl.active1 = false;
$ctrl.name = '';



    $ctrl.onSetUserName = function (name) {
       if(UserAPI.checkUserName(name)) {
           UserAPI.setUserName(name);

       }
       else {
           UserAPI.setUserName('User');

       }
        $rootScope.$emit('event');
    }





}

HomeController.$inject = ['UserAPI','$rootScope'];
module.exports = HomeController;

