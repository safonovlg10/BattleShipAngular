/**
 * Created by safon on 19.10.17.
 */

function gameComponent() {
    return {
        bindings: {
            border: '='
        },
        template: require('./game.mode.html'),
        controllerAs: '$ctrl',
        controller: require('./game.mode.controller')

    }
}

module.exports = gameComponent;