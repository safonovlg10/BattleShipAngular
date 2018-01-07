/**
 * Created by safon on 05.10.17.
 */
function layoutController($scope,$rootScope, UserAPI) {

    var self = this;



$rootScope.$on('event', function (event, data) {
    // console.log(UserAPI.getUserName());
    $scope.user = UserAPI.getUserName()
})

}

layoutController.$inject = ['$scope','$rootScope',  'UserAPI'];
module.exports = layoutController;