'use strict';

let newLetterTemplate = require('./templates/newLetter.html');

module.exports = function() {
    return {
        restrict: 'E',
        template: newLetterTemplate,
        scope: {
            new: '='
        }
    }
};