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
            selected: '='
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

angular.module('mailApp').directive('preview', function(dirController) {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/forMainContainer/preview.html',
        scope: {
            selected: '='
        },
        link: function(scope) {
            scope.back = function() {
                dirController.setActiveDir(scope.selected.letter.info.dir)
            }
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
            letters: '='
        },
        link: function(scope) {
            scope.directory = 'favorites'
        }
    }
});

angular.module('mailApp').directive('contacts', function(letterController) {
   return {
       restrict: 'E',
       templateUrl: 'mailApp/templates/forMainContainer/contacts.html',
       scope: {
           users: '='
       },
       link: function(scope) {
           scope.newUser = {};
           scope.addContact = function() {
               scope.users.push(scope.newUser);
               scope.newUser = {};
               letterController.saveUserToStorage();
           };
           scope.removeContact = function(id) {
               scope.users.splice(id, 1);
               letterController.saveUserToStorage();
           };
       }
   }
});