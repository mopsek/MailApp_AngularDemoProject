angular.module('mailApp', []);

angular.module('mailApp').factory('dirController', function() {
    var _activeDir = 'inbox';

    function setActiveDir(val) {
        _activeDir = val;
    }

    function compareDir(val) {
        return val === _activeDir;
    }

    function setDirActiveClass(val) {
        var activeClass = _activeDir === val ? 'activeDir' : '';
        return activeClass;
    }

    return {
        checkDirClass: setDirActiveClass,
        setActiveDir: setActiveDir,
        compareDir: compareDir
    }
});

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

angular.module('mailApp').directive('newLetter', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/newLetter.html'
    }
});

angular.module('mailApp').directive('inboxLetters', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/inboxLetters.html',
        controller: function($http, $q) {
            var self = this;
            this.letters = [];
            (function foo() {
                var def = $q.defer();
                setTimeout(function() {
                    $http({method: 'GET', url: 'mails.json'}).
                        success(function(data){
                            def.resolve(data)
                        }).
                        error(function(err,status) {
                            console.log(err + status);
                        });
                }, 2000);

                return def.promise;
            })().then(function(d) {self.letters = d});



        },
        controllerAs: 'inboxLetters'
    }
});

angular.module('mailApp').directive('sentLetters', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/sentLetters.html',
        scope: {},
        controller: function() {
            this.letters = [
                {
                    date: 'Fr, 01 january 2019',
                    sender: 'Masha Dashkina',
                    title: 'New big title',
                    content: 'retrieval of the scope associated with DOM node where {{greeting}} is defined in template. In this example this is the same scope as the scope which was passed into MyController. (We will discuss scope hierarchies later.)'
                },
                {
                    date: 'Fr, 20 january 2019',
                    sender: 'Vasya Pupkin',
                    title: 'New big title',
                    content: 'adfjaksjfakef aefinka eflkanef ake flkaelf alekf alke faekf alekf ae' +
                    'aefaekfeafklaefjalekjflakejflaeflkjaelkjfalneflkanefjnekjwnfkjwnf wefnwef ' +
                    'wefwe wlekfwne fw'
                },
                {
                    date: 'Mn, 49 july 3019',
                    sender: 'Masha Dashkina',
                    title: 'Letter not Found',
                    content: 'mmmm mmmm mmmmmmmmmmmmmmmmmm mm mm mmmmmmmmmm mm mmmmmmmmmmmmm m mmmmmmmmm mmmmmmm mmm' +
                    ' mmm mmmmmmmm mm'
                }
            ];

        },
        controllerAs: 'sentLetters'
    }
});

angular.module('mailApp').directive('cartLetters', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/cartLetters.html',
        scope: {},
        controller: function() {
            this.letters = [
                {
                    date: 'Fr, 20 january 2019',
                    sender: 'Vasya Pupkin',
                    title: 'New big title',
                    content: 'adfjaksjfakef aefinka eflkanef ake flkaelf alekf alke faekf alekf ae' +
                    'aefaekfeafklaefjalekjflakejflaeflkjaelkjfalneflkanefjnekjwnfkjwnf wefnwef ' +
                    'wefwe wlekfwne fw'
                },
                {
                    date: 'Mn, 49 july 3019',
                    sender: 'Masha Dashkina',
                    title: 'Letter not Found',
                    content: 'mmmm mmmm mmmmmmmmmmmmmmmmmm mm mm mmmmmmmmmm mm mmmmmmmmmmmmm m mmmmmmmmm mmmmmmm mmm' +
                    ' mmm mmmmmmmm mm'
                }
            ];

        },
        controllerAs: 'cartLetters'
    }
});

angular.module('mailApp').directive('mainContainer', function() {
    return {
        restrict:'A',
        scope: true,
        controller: function(dirController) {
            this.active = dirController.compareDir;
        },
        controllerAs: 'directory'
    }
});

angular.module('mailApp').filter('short_content', function() {
    return function(content) {
        return content.slice(0, 220) + '...';
    }
});