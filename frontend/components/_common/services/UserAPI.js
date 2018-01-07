/**
 * Created by safon on 10.09.17.
 */

function UserAPI($rootScope) {

    var self = this;
  var _userName = 'user';
   self.checkUserName =  function (username) {
        if(username !== ''&& username !== ' '&& username !== null){
            return true;
        }



    };

    return {
        setUserName: function (username) {
            if (self.checkUserName(username)) {
                _userName  = username;

            }

        },
            getUserName: function () {
                return _userName


            },
        checkUserName: function (name) {
            return self.checkUserName(name)
        }
    }

}

UserAPI.$inject = ['$rootScope'];
module.exports = UserAPI;