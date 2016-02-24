'use strict';

let menuTemplate = require('./template/menu.html');

module.exports = function($document) {
    return {
        restrict: 'E',
        template: menuTemplate,
        scope: {},
        controller: function (stateService, letterService, $stateParams, authorizationService) {
            this.setDirectory = stateService.setActiveState;
            this.currentState = stateService.currentState;

            this.getPreviewDir = function() {
                if (!letterService.selected.letter) return;
                return $stateParams.directory;
            };

            this.remove = letterService.removeLetter;
            this.recover = letterService.recoverLetter;
            this.send = letterService.moveNewLetter;
            this.edit = letterService.editDraft;
            this.loginOut = authorizationService.loginOut;

            this.newLetter = function() {
                letterService.newLetter.letter = {};
                stateService.setActiveState('newLetterForm');
            };

            this.replay = function() {
                letterService.newLetter.letter.to = letterService.selected.letter.sender;
                stateService.setActiveState('newLetterForm');
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
};
