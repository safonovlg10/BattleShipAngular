/**
 * Created by safon on 03.11.17.
 */
require('./play.border.style.css');
function playBoarder() {
    return {
        bindings: {
            objects: '=',
            name:'@'
        },
        template: require('./playeBoard.html'),
        controllerAs: '$ctrl',
        // controller: require('./homeCtrl')

    }
}

module.exports = playBoarder;