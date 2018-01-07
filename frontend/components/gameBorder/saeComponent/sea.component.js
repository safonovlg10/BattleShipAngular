/**
 * Created by safon on 05.11.17.
 */

require('./sea.style.css');
function seaComponent() {
    return {
        bindings:{
            objects: '=',
            name:'='
        },
        template: require('./sea.component.html'),
        controllerAs: '$ctrl',
        controller: require('./sea.controller'),
    }
}

seaComponent.$inject =  [];

module.exports = seaComponent;





