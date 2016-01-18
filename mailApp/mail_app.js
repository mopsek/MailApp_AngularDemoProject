angular.module('mailApp', []);

angular.module('mailApp').factory('dirController', function() {
    var _activeDir = 'inbox';

    function setActiveDir(val) {
        _activeDir = val;
    }

    function compareDir(val) {
        return val === _activeDir;
    }

    return {
        setActiveDir: setActiveDir,
        compareDir: compareDir
    }
});

angular.module('mailApp').directive('letter', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/letter.html',
        controller: function() {
            this.a = function(v){alert(v)}
        },
        controllerAs: 'c'
    };
});

angular.module('mailApp').directive('mailDirectories', function () {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/mailDirectories.html',
        controller: function (dirController) {
            this.set = dirController.setActiveDir;
        },
        controllerAs: 'directory'
    }
});

angular.module('mailApp').directive('menu', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/menu.html',
        controller: function (dirController) {
            this.setDirectory = dirController.setActiveDir;
            this.checkDirectory = dirController.compareDir;
        },
        controllerAs: 'menu'
    }
});

angular.module('mailApp').directive('temp', function() {
    return {
        controller: function(dirController) {
            this.check = dirController.compareDir;
        },
        controllerAs: 'c'
    }
});

angular.module('mailApp').directive('inboxLetters', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/inboxLetters.html',
        controller: function(dirController) {
            this.letters = [
                {
                    date: 'Fr, 20 january 2019',
                    sender: 'Vasya Pupkin',
                    title: 'New big title',
                    content: 'Scopes can be nested to limit access to the properties of application components while providing access to shared model properties. Nested scopes are either "child scopes" or "isolate scopes". A "child scope" (prototypically) inherits properties from its parent scope. An "isolate scope" does not. See isolated scopes for more information.'
                },
                {
                    date: 'Mn, 49 july 3019',
                    sender: 'Masha Dashkina',
                    title: 'Letter not Found',
                    content: 'Scopes provide context against which expressions are evaluated. For example {{username}} expression is meaningless, unless it is evaluated against a specific scope which defines the username property.'
                },
                {
                    date: 'Fr, 63 january 1919',
                    sender: 'Vasya Pupkin',
                    title: 'nested to limit access to',
                    content: 'sdfkmlkwef wefjqelfj qefjlq elfjq elfj qelf qrhg wlthjg wghnreign;rlkjgw rgw;jkrng wj rgwkjrgwljr gwrg lwhrglwhr glwhr glwhr glwhr glhrglqhrglqjnrg'
                },
                {
                    date: 'Fr, 20 january 2014',
                    sender: 'Vasya Pupkin',
                    title: 'important point since it makes the controllers',
                    content: 'Similarly the controller can assign behavior to scope as seen by the sayHello method, which is invoked when the user clicks on the button. The sayHello method can read the username property and create a greeting property. This demonstrates that the properties on scope update automatically when they are bound to HTML input widgets.'
                },
                {
                    date: 'Fr, 01 january 2019',
                    sender: 'Masha Dashkina',
                    title: 'New big title',
                    content: 'retrieval of the scope associated with DOM node where {{greeting}} is defined in template. In this example this is the same scope as the scope which was passed into MyController. (We will discuss scope hierarchies later.)'
                }
            ];

            this.active = dirController.compareDir;

        },
        controllerAs: 'inboxLetters'
    }
});

angular.module('mailApp').directive('sentLetters', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/sentLetters.html',
        controller: function(dirController) {
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
            this.active = dirController.compareDir;

        },
        controllerAs: 'sentLetters'
    }
});

angular.module('mailApp').directive('cartLetters', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/cartLetters.html',
        controller: function(dirController) {
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
            this.active = dirController.compareDir;

        },
        controllerAs: 'cartLetters'
    }
});

angular.module('mailApp').filter('short_content', function() {
    return function(content) {
        return content.slice(0, 220) + '...';
    }
});