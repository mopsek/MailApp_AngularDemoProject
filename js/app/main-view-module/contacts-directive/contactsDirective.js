'use strict';

let contactsTemplate = require('./template/contacts.html');

module.exports = function(letterService, stateService, dataService) {
    return {
        restrict: 'E',
        template: contactsTemplate,
        scope: {
            users: '='
        },
        link: function(scope) {
            scope.newUser = {};
            scope.addContact = function() {
                scope.users.push(scope.newUser);
                scope.newUser = {};
                dataService.saveUserToStorage();
            };
            scope.removeContact = function(id) {
                scope.users.splice(id, 1);
                dataService.saveUserToStorage();
            };
            scope.mailTo = function(mail) {
                letterService.newLetter.letter = {
                    to: mail
                };
                stateService.setActiveState('newLetterForm')
            }
        }
    }
};