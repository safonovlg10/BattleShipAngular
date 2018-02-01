/**
 * Created by safon on 21.11.17.
 */
function bloomer() {
    return{
        creat :function () {
            return new hit();
        }
    };
    function hit() {

        var self  = this;
        var type = 'hit';

        self.getType = function () {
            return type;
        };
    }


}

module.exports = bloomer;