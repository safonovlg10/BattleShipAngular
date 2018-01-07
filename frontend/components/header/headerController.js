/**
 * Created by safon on 16.09.17.
 */


function headerController(UserAPI, $rootScope) {

    var $ctrl = this;
    // $ctrl.user = UserAPI.getUserName();
    // console.log($ctrl)

//     $rootScope.$on('event', function () {
//
//         $ctrl.user = UserAPI.getUserName()
// })


}

headerController.$inject = ['UserAPI', '$rootScope'];
module.exports = headerController;