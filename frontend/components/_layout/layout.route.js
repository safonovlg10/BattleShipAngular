/**
 * Created by safon on 12.09.17.
 */







function appLayoutRun($stateProvider,$urlRouterProvider) {

$stateProvider.state('app.layout', {
    abstract: true,
    views: {

        header: {

            component: 'headerComponent'

        },

        footer: {
            template: require('../footer/footer.html')
        }


    }

}).state('app', {
    abstract: true,
    // component: 'layoutComponent',
    // resolve: {
    //     users: function (UserAPI, $rootScope) {
    //
    //         return UserAPI.getUserName();
    //     }
    // },
    template: require('./main.layout.html'),
    controller: require('./layout.controller')

})

}

appLayoutRun.$inject = ['$stateProvider', '$urlRouterProvider'];

module.exports = appLayoutRun;