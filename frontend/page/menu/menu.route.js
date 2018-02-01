/**
 * Created by safon on 20.10.17.
 */

function uiRouterConfig($stateProvider, $urlRouterProvider) {
    // $urlRouterProvider.otherwise('/');
    $stateProvider.state('app.layout.menu', {

        url: '/menu',
        views: {
            'content@app': {
                template: require('./menu.html')
            }
        }

    })

}


uiRouterConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

module.exports = uiRouterConfig;