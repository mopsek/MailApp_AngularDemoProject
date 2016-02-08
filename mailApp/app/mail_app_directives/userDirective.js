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