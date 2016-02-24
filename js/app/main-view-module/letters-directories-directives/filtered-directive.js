'use strict';

let filteredTemplate = require('./templates/filteredLetters.html');

module.exports = function() {
    return {
        restrict: 'E',
        template: filteredLetters,
        scope: {
            letters: '=',
            user: '='
        },
        controller: function(stateService) {
            this.back = function() {
                stateService.setActiveState('contacts')
            }
        },
        controllerAs: 'filterDir',
        link: function(scope) {
            scope.directory = 'filtered';
        }
    }
};