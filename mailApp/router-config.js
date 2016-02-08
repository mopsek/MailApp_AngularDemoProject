angular.module('mailApp').config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('signIn', {
            url: '/signin',
            template: '<sign-in></sign-in>'
        })
        .state('mail', {
            url: '/mail',
            abstract: true,
            templateUrl: 'mailApp/templates/main.html',
            resolve: {
                checkPermission: function(checkData, $q, $state) {
                    if( !checkData.getPermission() ) {
                        $state.go('/signin');
                        return $q.reject();
                    }
                }
            }
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
        .state('mail.loading', {
            url: "/loading",
            template: '<loading destroy="directory.destroy()"></loading>'
        })
        .state('mail.filtered', {
            url: '/filtered',
            template: '<filtered-letters letters="directory.base.letters.inbox" user="directory.selected.user"></filtered-letters>'
        });

    $urlRouterProvider.otherwise('/signin')
});