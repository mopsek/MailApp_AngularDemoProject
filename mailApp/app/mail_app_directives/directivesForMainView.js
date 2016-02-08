angular.module('mailApp').directive('inboxLetters', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/forMainContainer/inboxLetters.html',
        scope: {
            letters: '='
        },
        link: function(scope) {
            scope.directory = 'inbox'
        }
    }
});

angular.module('mailApp').directive('sentLetters', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/forMainContainer/sentLetters.html',
        scope: {
            letters: '='
        },
        link: function(scope) {
            scope.directory = 'sent'
        }
    }
});

angular.module('mailApp').directive('cartLetters', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/forMainContainer/cartLetters.html',
        scope: {
            letters: '='
        },
        link: function(scope) {
            scope.directory = 'trash'
        }
    }
});

angular.module('mailApp').directive('newLetter', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/forMainContainer/newLetter.html',
        scope: {
            new: '='
        }
    }
});

angular.module('mailApp').directive('loading', function(animating) {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/forMainContainer/loading.html',
        scope: {
            destroy: '='
        },
        link: function(scope, element) {
            animating.loading(element.children()[0]);
            scope.$watch('destroy', function(newV){
                if (newV) element.remove();
            });
        }
    }
});



angular.module('mailApp').directive('drafts', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/forMainContainer/drafts.html',
        scope: {
            letters: '='
        },
        link: function(scope) {
            scope.directory = 'drafts'
        }
    }
});

angular.module('mailApp').directive('favorites', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/forMainContainer/favorites.html',
        scope: {
            inbox: '=',
            sent: '='
        },
        link: function(scope) {
            scope.letters = scope.inbox.concat(scope.sent);
            scope.directory = 'favorites'
        }
    }
});



angular.module('mailApp').directive('filteredLetters', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/forMainContainer/filteredLetters.html',
        scope: {
            letters: '=',
            user: '='
        },
        controller: function(dirController) {
            this.back = function() {
                dirController.setActiveDir('contacts')
            }
        },
        controllerAs: 'filterDir',
        link: function(scope) {
            scope.directory = 'filtered';
        }
    }
});