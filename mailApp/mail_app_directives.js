angular.module('mailApp').directive('letter', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/letter.html'
    };
});

angular.module('mailApp').directive('mailDirectories', function () {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/mailDirectories.html',
        controller: function (dirController) {
            this.set = dirController.setActiveDir;
            this.checkClass = dirController.checkDirClass;
        },
        controllerAs: 'directory'
    }
});

angular.module('mailApp').directive('menu', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/menu.html',
        controller: function (dirController, $q) {
            this.setDirectory = dirController.setActiveDir;
            this.checkDirectory = dirController.compareDir;

        },
        controllerAs: 'menu'
    }
});

angular.module('mailApp').directive('mainContainer', function() {
    return {
        restrict:'A',
        scope: true,
        controller: function(dirController, letterController) {
            var load = letterController.init(),
                self = this;

            load.then(function(data) {
                self.letters = data;
                dirController.setActiveDir('inbox');
            });

            this.letters = {};
            this.active = dirController.compareDir;
        },
        controllerAs: 'directory'
    }
});

angular.module('mailApp').directive('inboxLetters', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/inboxLetters.html',
        scope: {
            letters: '='
        }
    }
});

angular.module('mailApp').directive('sentLetters', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/sentLetters.html',
        scope: {
            letters: '='
        }
    }
});

angular.module('mailApp').directive('cartLetters', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/cartLetters.html',
        scope: {
            letters: '='
        }
    }
});

angular.module('mailApp').directive('newLetter', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/newLetter.html'
    }
});

angular.module('mailApp').directive('loading', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/loading.html',
        controller: function(animating, $element) {
            var self = this;

            function addComa(elem) {
                function add() {
                    if(elem.innerHTML.length === 21) elem.innerHTML = 'Loading lettersgit add';
                    elem.innerHTML += '.';
                    setTimeout(add, 500)
                }
                add()
            }

            animating.loading($element.children()[0]);
            addComa($element.children()[0]);

            console.log($element.children()[0].innerHTML)
        },
        controllerAs: 'loading'
    }
})