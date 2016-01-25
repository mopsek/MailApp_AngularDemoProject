angular.module('mailApp').directive('letter', function(letterController, dirController) {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/letter.html',
        link: function(scope) {
            scope.preview = function(scope) {
                letterController.select(scope);
                dirController.setActiveDir('preview');
            }
        }
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
            var self = this;

            this.base = letterController.base;
            this.active = dirController.compareDir;
            this.selected = letterController.selected;


            this.destroy = function() {
                if (!self.base.letters) return false;
                return true;
            };

        },
        controllerAs: 'directory'
    }
});

