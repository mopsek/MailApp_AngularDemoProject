'use strict';

let inboxTemplate = require('./templates/inboxLetters.html');

module.exports = function() {
    return {
        restrict: 'E',
        template: inboxTemplate,
        scope: {
            letters: '='
        },
        link: function(scope) {
            scope.directory = 'inbox';
        }
    }
};