angular.module('main-view').directive('user', function(letterService, stateService, dataService) {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/app/main-view-module/user-directive/template/user.html',
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
});