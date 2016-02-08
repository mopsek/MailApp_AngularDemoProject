angular.module('mailApp').directive('contacts', function(letterController, dirController) {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/forMainContainer/contacts.html',
        scope: {
            users: '='
        },
        link: function(scope) {
            scope.newUser = {};
            scope.addContact = function() {
                scope.users.push(scope.newUser);
                scope.newUser = {};
                letterController.saveUserToStorage();
            };
            scope.removeContact = function(id) {
                scope.users.splice(id, 1);
                letterController.saveUserToStorage();
            };
            scope.mailTo = function(mail) {
                letterController.newLetter.letter = {
                    to: mail
                };
                dirController.setActiveDir('newLetterForm')
            }
        }
    }
});