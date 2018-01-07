/**
 * Created by safon on 03.10.17.
 */

function headerComponent() {
    return {
        bindings: {
            name: '='

        },
        controller: require('./headerController'),
        controllerAs: '$ctrl',
        template: require('./header.html')

    }
}

module.exports = headerComponent;
