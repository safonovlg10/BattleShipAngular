/**
 * Created by safon on 19.10.17.
 */

function gameConfig($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app.layout.game', {

        url: '/game',

        views: {
            'content@app': {
                component: 'gameModeComponent'

            }
        }


    })
}


gameConfig.$inject = ['$stateProvider', '$urlRouterProvider'];


module.exports = gameConfig;