 'use strict';

let userTemplate = require('./template/user.html');

module.exports = function(letterService, stateService, dataService) {
    return {
        restrict: 'E',
        template: userTemplate,
        link: function(scope) {
            scope.editMode = false;
            scope.toggleMode = function() {
                scope.editMode = !scope.editMode;
                dataService.saveUserToStorage();
            };

            scope.selectUser = function() {
                if (!scope.user.email) {
                    alert('У данного контакта нет Email!!!')
                }
                letterService.selected.user = scope.user.name;
                stateService.setActiveState('filtered')
            }
        }
    }
};