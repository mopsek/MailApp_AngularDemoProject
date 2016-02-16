angular.module('mailApp').directive('menu', function($document) {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/menu.html',
        scope: {},
        controller: function (dirController, letterController, $stateParams, checkData) {
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
            this.loginOut = checkData.loginOut;

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
                } else if (document.getElementById('settingsButton')) {
                    scope.showMenu = false;
                    document.getElementById('settingsButton').classList.remove('activeSetting');
                    scope.$digest();
                }
            });
        }
    }
});
