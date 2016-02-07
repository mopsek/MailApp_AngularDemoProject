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
                var index = letterController.base.letters[directory].indexOf(scope.letter);
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
                dirController.setActiveDir('filtered')
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
            this.recover = letterController.recoverLetter;
            this.send = letterController.moveNewLetter;
            this.edit = letterController.editDraft;

            this.newLetter = function() {
                letterController.newLetter.letter = {};
                dirController.setActiveDir('newLetterForm');
            };

            this.replay = function() {
                letterController.newLetter.letter.to = letterController.selected.letter.sender;
                dirController.setActiveDir('newLetterForm');
            }

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

