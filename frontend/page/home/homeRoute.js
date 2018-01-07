/**
 * Created by safon on 10.09.17.
 */
function uiRouterConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');
    $stateProvider.state('app.layout.home',{
        // abstract: true,
        url: '/',
        views:{
            'content@app': {
                component: 'homeComponent'



            }
        }


    })

}

uiRouterConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
module.exports = uiRouterConfig;