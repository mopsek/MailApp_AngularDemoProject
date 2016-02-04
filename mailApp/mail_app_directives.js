angular.module('mailApp').directive('letter', function(letterController, dirController) {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/letter.html',
        link: function(scope) {

            scope.remove = function($event) {
                $event.preventDefault();
                letterController.removeLetter(scope.letter)
            };

            scope.preview = function(scope) {
                var index = letterController.base.letters[scope.directory].indexOf(scope.letter);
                dirController.setActiveDir('preview',{dir: scope.directory, index: index});
                if (scope.letter.unread) scope.letter.unread = false;
            };


            scope.checkUnreadClass = function() {
                return scope.letter.unread ? 'unread' : ''
            }
        }
    };
});

angular.module('mailApp').directive('user', function(letterController, dirController) {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/user.html',
        link: function(scope) {
            scope.editMode = false;
            scope.toggleMode = function() {
                scope.editMode = !scope.editMode;
                letterController.saveUserToStorage();
            };

            scope.selectUser = function() {
                if (!scope.user.email) {
                    alert('У данного контакта нет Email!!!')
                }
                letterController.selected.user = scope.user.name;
                dirController.setActiveDir('filteredLetters')
            }
        }
    }
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

angular.module('mailApp').directive('menu', function($document) {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/menu.html',
        scope: {},
        controller: function (dirController, letterController, $stateParams) {
            this.setDirectory = dirController.setActiveDir;
            this.currentState = dirController.currentState;

            this.getPreviewDir = function() {
                if (!letterController.selected.letter) return;
                return $stateParams.directory;
            };

            this.remove = letterController.removeLetter;


        },
        controllerAs: 'menu',
        link: function(scope) {
            scope.showMenu = false;
            $document.on('click', function(e) {
                if (e.target.id === 'settingsButton') {
                    scope.showMenu = !scope.showMenu;
                    e.target.classList.toggle('activeSetting');
                    scope.$digest();
                } else {
                    scope.showMenu = false;
                    document.getElementById('settingsButton').classList.remove('activeSetting');
                    scope.$digest();
                }
            });
        }
    }
});

angular.module('mailApp').directive('mainContainer', function() {
    return {
        restrict:'A',
        scope: true,
        controller: function(dirController, letterController) {
            var self = this;

            this.base = letterController.base;
            this.selected = letterController.selected;
            this.newLetter = letterController.newLetter;


            this.destroy = function() {
                if (!self.base.letters) return false;
                return true;
            };

        },
        controllerAs: 'directory'
    }
});

