'use strict';

let trashTemplate = require('./templates/cartLetters.html');

module.exports = function() {
    return {
        restrict: 'E',
        template: trashTemplate,
        scope: {
            letters: '='
        },
        link: function(scope) {
            scope.directory = 'trash'
        }
    }
};