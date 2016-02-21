angular.module('authorization', []).
    config(function($stateProvider) {
        $stateProvider
            .state('mail.loading', {
                url: "/loading",
                template: '<loading></loading>'
            })
    });