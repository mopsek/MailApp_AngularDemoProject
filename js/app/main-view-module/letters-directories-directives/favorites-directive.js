'use strict';

let favoritesTemplate = require('./templates/favorites.html');

module.exports = function() {
    return {
        restrict: 'E',
        template: favoritesTemplate,
        scope: {
            inbox: '=',
            sent: '='
        },
        link: function(scope) {
            scope.letters = scope.inbox.concat(scope.sent);
            scope.directory = 'favorites'
        }
    }
};