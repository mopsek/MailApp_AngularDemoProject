'use strict';

let sentTemplate = require('./templates/sentLetters.html');

module.exports = function() {
    return {
        restrict: 'E',
        template: sentTemplate,
        scope: {
            letters: '='
        },
        link: function(scope) {
            scope.directory = 'sent'
        }
    }
};