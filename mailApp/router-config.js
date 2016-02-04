angular.module('mailApp').config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('mail', {
            url: '/mail',
            abstract: true,
            template: '<ui-view />'
        })
        .state('mail.inbox', {
            url: '/inbox',
            template: '<inbox-letters letters="directory.base.letters.inbox"></inbox-letters>'
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
            template: '<favorites letters="directory.base.letters.favorites"></favorites>'
        })
        .state('mail.newLetterForm', {
            url: '/new_letter',
            template: '<new-letter newLetter="directory.newLetter"></new-letter>'
        })
        .state('mail.contacts', {
            url: '/contacts',
            template: '<contacts users="directory.base.users"></contacts>'
        })
        .state('mail.preview', {
            url: '/:directory/:index',
            template: '<preview selected="directory.selected"></preview>'
        })
        .state('loading', {
            url: "/loading",
            template: '<loading destroy="directory.destroy()"></loading>'
        });

    $urlRouterProvider.otherwise('/loading')
});