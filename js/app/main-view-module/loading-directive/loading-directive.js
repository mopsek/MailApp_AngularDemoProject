'use strict';

let loadingTemplate = require('./template/loading.html');

module.exports = function(animationService) {
    return {
        restrict: 'E',
        template: loadingTemplate,

        controller: function(initializationService, $state) {
            if (!initializationService.getInit()) $state.go('mail.inbox');
        },
        link: function(scope, element) {
            animationService.loading(element.children()[0]);
        }
    }
};