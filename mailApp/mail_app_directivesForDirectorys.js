angular.module('mailApp').directive('inboxLetters', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/inboxLetters.html',
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
        templateUrl: 'mailApp/templates/sentLetters.html',
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
        templateUrl: 'mailApp/templates/cartLetters.html',
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
        templateUrl: 'mailApp/templates/newLetter.html'
    }
});

angular.module('mailApp').directive('loading', function(animating) {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/loading.html',
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

angular.module('mailApp').directive('preview', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/preview.html',
        scope: {
            selected: '='
        },
        link: function(scope) {
            scope.selectedLetter = scope.selected;
        }
    }
})