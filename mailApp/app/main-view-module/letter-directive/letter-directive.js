angular.module('main-view').directive('letter', function(letterService, stateService, dataService) {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/app/main-view-module/letter-directive/template/letter.html',
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
});