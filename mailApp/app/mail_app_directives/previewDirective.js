angular.module('mailApp').directive('preview', function(dirController) {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/forMainContainer/preview.html',
        scope: {
            selected: '='
        },
        controller: function($stateParams, letterController) {
            var directory = $stateParams.directory,
                index = $stateParams.index.slice(0, 1);
            if (directory === 'filtered') directory = 'inbox';
            if (directory === 'favorites') {
                directory = $stateParams.index.slice(2);
            }
            letterController.selected.letter = letterController.base.letters[directory][index];

            this.back = function() {
                dirController.setActiveDir($stateParams.directory)
            }
        },
        controllerAs: 'preview'
    }
});