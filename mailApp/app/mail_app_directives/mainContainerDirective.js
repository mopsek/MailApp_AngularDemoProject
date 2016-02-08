angular.module('mailApp').directive('mainContainer', function() {
    return {
        restrict:'AE',
        scope: true,
        controller: function(dirController, letterController) {
            var self = this;

            this.base = letterController.base;
            this.selected = letterController.selected;
            this.newLetter = letterController.newLetter;


            this.destroy = function() {
                if (!self.base.letters) return false;
                return true;
            };

        },
        controllerAs: 'directory'
    }
});