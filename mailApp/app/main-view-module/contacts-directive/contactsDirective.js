angular.module('main-view').directive('contacts', function(letterService, stateService, dataService) {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/app/main-view-module/contacts-directive/template/contacts.html',
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
});