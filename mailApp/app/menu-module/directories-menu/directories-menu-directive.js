angular.module('menu').directive('mailDirectories', function () {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/app/menu-module/directories-menu/template/directories-menu.html',
        controller: function (stateService) {
            this.set = stateService.setActiveState;
            this.checkClass = stateService.checkDirClass;
        },
        controllerAs: 'directory'
    }
});