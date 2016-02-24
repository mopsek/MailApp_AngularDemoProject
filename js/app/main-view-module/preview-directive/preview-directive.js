'use strict';

let previewTemplate = require('./template/preview.html');

module.exports = function() {
    return {
        restrict: 'E',
        template: previewTemplate,
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
};