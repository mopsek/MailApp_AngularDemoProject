'use strict';

let draftsTemplate = require('./templates/drafts.html');

module.exports = function() {
    return {
        restrict: 'E',
        template: draftsTemplate,
        scope: {
            letters: '='
        },
        link: function(scope) {
            scope.directory = 'drafts'
        }
    }
};