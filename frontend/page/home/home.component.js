/**
 * Created by safon on 05.10.17.
 */
function homeComponent() {
    return {
        bindings: {},
        template: require('./home.html'),
        controllerAs: '$ctrl',
        controller: require('./homeCtrl')

    }
}

module.exports = homeComponent;