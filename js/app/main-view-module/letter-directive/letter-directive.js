'use strict';

let letterTemplate = require('./template/letter.html');

module.exports = function(letterService, stateService, dataService) {
    return {
        restrict: 'E',
        template: letterTemplate,
        link: function(scope) {

            scope.remove = function(event) {
                event.stopPropagation();
                letterService.removeLetter(scope.letter)
            };

            scope.preview = function(scope) {
                var directory = scope.directory;
                if (directory === 'filtered') directory = 'inbox';
                if (directory === 'favorites') {
                    directory = scope.letter.directory;
                }
                var index = (dataService.base.letters[directory].indexOf(scope.letter)) + '_' + directory;
                stateService.setActiveState('preview',{dir: scope.directory, index: index});
                if (scope.letter.unread) scope.letter.unread = false;
                dataService.saveLettersToStorage();
            };

            scope.toggleFavorite = function(letter, event) {
                if(event) event.stopPropagation();
                letterService.toggleFavorite(letter);
            };

            scope.checkUnreadClass = function() {
                return scope.letter.unread ? 'unread' : ''
            };

            scope.checkFavorite = function() {
                return scope.letter.favorite ? 'activeFavorite' : ''
            };
        }
    };
};