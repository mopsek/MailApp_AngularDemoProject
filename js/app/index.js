'use strict';

require('angular-cookies');

const mailApp = angular.module('mailApp', ['ui.router', 'ngCookies', require('./authorization-module').name, require('./menu-module').name, require('./main-view-module').name]);

mailApp.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('signIn', {
            url: '/signin',
            template: '<sign-in></sign-in>'
        })
        .state('mail', {
            url: '/mail',
            abstract: true,
            templateUrl: 'js/app/main-view-module/main-container-directive/template/main.html'
        })
        .state('mail.inbox', {
            url: '/inbox',
            template: '<inbox-letters letters="directory.base.letters.inbox"></inbox-letters>'
        })
        .state('mail.loading', {
            url: "/loading",
            template: '<loading></loading>'
        })
        .state('mail.sent', {
            url: '/sent',
            template: '<sent-letters letters="directory.base.letters.sent"></sent-letters>'
        })
        .state('mail.trash', {
            url: '/trash',
            template: '<cart-letters letters="directory.base.letters.trash"></cart-letters>'
        })
        .state('mail.drafts', {
            url: '/drafts',
            template: '<drafts letters="directory.base.letters.drafts"></drafts>'
        })
        .state('mail.favorites', {
            url: '/favorites',
            template: '<favorites inbox="directory.base.letters.inbox" sent="directory.base.letters.sent"></favorites>'
        })
        .state('mail.newLetterForm', {
            url: '/new_letter',
            template: '<new-letter new="directory.newLetter"></new-letter>'
        })
        .state('mail.contacts', {
            url: '/contacts',
            template: '<contacts users="directory.base.users"></contacts>'
        })
        .state('mail.preview', {
            url: '/:directory/:index',
            template: '<preview selected="directory.selected"></preview>'
        })
        .state('mail.filtered', {
            url: '/filtered',
            template: '<filtered-letters letters="directory.base.letters.inbox" user="directory.selected.user"></filtered-letters>'
        });


    $urlRouterProvider.otherwise(function ($injector) {
        if ($injector.get('authorizationService').getPermission()) return '/mail/inbox';
        return '/signin';
    });
});

mailApp.run(function($rootScope, $state, authorizationService, dataService) {
    $rootScope.$on('$stateChangeStart', function(event, toState) {
        if ( (document.cookie.indexOf('session') + 1) && !dataService.base.letters) {
            authorizationService.continueSession();
            return;
        }
        if (toState.name !=='signIn' && !authorizationService.getPermission()) {
            $state.go('signIn');
            event.preventDefault();
        }
    });
});

mailApp.service('animationService', require('./services/animationService'));
mailApp.service('authorizationService', require('./services/authorizationService'));
mailApp.service('dataService', require('./services/dataService'));
mailApp.service('initializationService', require('./services/initializationService'));
mailApp.service('letterService', require('./services/letterService'));
mailApp.service('stateService', require('./services/stateService'));

mailApp.service('mails', require('./services/data/mailsService'));
mailApp.service('profiles', require('./services/data/profileService'));
mailApp.service('users', require('./services/data/userService'));

mailApp.filter('short_content', require('./services/filters'));


module.exports = mailApp;