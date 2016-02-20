angular.module('main-view').directive('preview', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/app/main-view-module/preview-directive/template/preview.html',
        scope: {
            selected: '='
        },
        controller: function($stateParams, letterService, stateService, dataService) {
            var directory = $stateParams.directory,
                index = $stateParams.index.slice(0, 1);
            if (directory === 'filtered') directory = 'inbox';
            if (directory === 'favorites') {
                directory = $stateParams.index.slice(2);
            }
            letterService.selected.letter = dataService.base.letters[directory][index];

            this.back = function() {
                stateService.setActiveState($stateParams.directory)
            }
        },
        controllerAs: 'preview'
    }
});