angular.module('mailApp').directive('letter', function(letterController, dirController) {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/letter.html',
        link: function(scope) {
            scope.preview = function(scope) {
                letterController.select(scope);
                dirController.setActiveDir('preview');
            };
            scope.remove = function(sc, event) {

                event.stopPropagation();
                letterController.remove(sc);
            };
            scope.toggleFavorite = function(sc, event) {
                event.stopPropagation();
                if (sc.letter.link) {
                    letterController.remove(sc, sc.letter);
                } else {
                    letterController.select(sc);
                    sc.letter.link = letterController.selected;
                    letterController.setTo('favorites')
                }
            };
            scope.checkFavoriteClass = function() {
                return this.letter.link ? 'activeFavorite' : '';
            }
        }
    };
});

angular.module('mailApp').directive('user', function(letterController) {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/user.html',
        link: function(scope) {
            scope.editMode = false;
            scope.toggleMode = function() {
                scope.editMode = !scope.editMode;
                letterController.saveUserToStorage();
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

angular.module('mailApp').directive('menu', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/menu.html',
        scope: {},
        controller: function (dirController, letterController) {
            this.setDirectory = dirController.setActiveDir;
            this.checkDirectory = dirController.compareDir;
            this.getPreviewDir = function() {
                if (!letterController.selected.letter) return;
                return letterController.selected.letter.info.dir;
            };

            this.remove = function() {
                letterController.remove();
                dirController.setActiveDir(letterController.selected.letter.info.dir)
            };

            this.recover = letterController.recover;

            this.create = letterController.create;

            this.moveTo = function(to) {
                if (letterController.selected.letter.$$hashKey && to === 'drafts') {
                    dirController.setActiveDir(to);
                    return;
                } else if (letterController.selected.letter.$$hashKey && to === 'sent') {
                    letterController.remove();
                }
                letterController.setTo(to);
                letterController.selected.letter.fromDir = to;
                dirController.setActiveDir(to);
            };

            this.repply = function() {
                letterController.create(letterController.selected.letter.sender);
                dirController.setActiveDir('newLetterForm');
            }


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

