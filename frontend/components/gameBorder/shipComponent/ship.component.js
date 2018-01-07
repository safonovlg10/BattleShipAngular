
require('./ship.style.css');

function shipComponent() {
    return {
        template: require('./ship.component.html'),
        // controller: shipController,
        controllerAs: '$ctrl',
        bindings:{
            status: '@',
            name: '@'
        }
    }
}

shipComponent.$inject = [];

module.exports = shipComponent;