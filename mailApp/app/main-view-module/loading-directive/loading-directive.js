angular.module('main-view').directive('loading', function(animationService) {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/app/main-view-module/loading-directive/template/loading.html',
        scope: {},
        controller: function(initializationService, $state) {
            if (!initializationService.getInit()) $state.go('mail.inbox');
        },
        link: function(scope, element) {
            animationService.loading(element.children()[0]);
        }
    }
});