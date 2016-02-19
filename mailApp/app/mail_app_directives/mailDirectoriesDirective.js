angular.module('mailApp').directive('mailDirectories', function () {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/mailDirectories.html',
        controller: function (stateService) {
            this.set = stateService.setActiveState;
            this.checkClass = stateService.checkDirClass;
        },
        controllerAs: 'directory'
    }
});