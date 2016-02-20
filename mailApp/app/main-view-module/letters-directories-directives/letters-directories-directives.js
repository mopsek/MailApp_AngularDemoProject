angular.module('main-view').directive('inboxLetters', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/app/main-view-module/letters-directories-directives/templates/inboxLetters.html',
        scope: {
            letters: '='
        },
        link: function(scope) {
            scope.directory = 'inbox'
        }
    }
});

angular.module('main-view').directive('sentLetters', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/app/main-view-module/letters-directories-directives/templates/sentLetters.html',
        scope: {
            letters: '='
        },
        link: function(scope) {
            scope.directory = 'sent'
        }
    }
});

angular.module('main-view').directive('cartLetters', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/app/main-view-module/letters-directories-directives/templates/cartLetters.html',
        scope: {
            letters: '='
        },
        link: function(scope) {
            scope.directory = 'trash'
        }
    }
});

angular.module('main-view').directive('newLetter', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/app/main-view-module/letters-directories-directives/templates/newLetter.html',
        scope: {
            new: '='
        }
    }
});

angular.module('main-view').directive('drafts', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/app/main-view-module/letters-directories-directives/templates/drafts.html',
        scope: {
            letters: '='
        },
        link: function(scope) {
            scope.directory = 'drafts'
        }
    }
});

angular.module('main-view').directive('favorites', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/app/main-view-module/letters-directories-directives/templates/favorites.html',
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



angular.module('main-view').directive('filteredLetters', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/app/main-view-module/letters-directories-directives/templates/filteredLetters.html',
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
});