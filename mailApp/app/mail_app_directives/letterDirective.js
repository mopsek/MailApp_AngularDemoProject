angular.module('mailApp').directive('letter', function(letterController, dirController) {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/letter.html',
        link: function(scope) {

            scope.remove = function(event) {
                event.stopPropagation();
                letterController.removeLetter(scope.letter)
            };

            scope.preview = function(scope) {
                var directory = scope.directory;
                if (directory === 'filtered') directory = 'inbox';
                if (directory === 'favorites') {
                    directory = scope.letter.directory;
                }
                var index = (letterController.base.letters[directory].indexOf(scope.letter)) + '_' + directory;
                dirController.setActiveDir('preview',{dir: scope.directory, index: index});
                if (scope.letter.unread) scope.letter.unread = false;
            };

            scope.toggleFavorite = function(letter, event) {
                if(event) event.stopPropagation();
                letterController.toggleFavorite(letter);
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