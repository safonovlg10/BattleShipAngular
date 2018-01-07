

require('./sea.detail.style.css');
function heroDetailComponent() {
    return {
        template: require('./heroDetail.html'),
        bindings: {
            ids: '=',
            loop: '@'
        }
    }
}

heroDetailComponent.$inject = [];

module.exports = heroDetailComponent;