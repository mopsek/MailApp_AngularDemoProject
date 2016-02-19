angular.module('mailApp').directive('signIn', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/signIn.html',
        scope: {},
        controller: function(authorizationService){
            this.login = '';
            this.password = '';

            this.enter = function(e) {
                if (e.keyCode === 13) this.signIn();
            };

            this.signIn = function() {
                authorizationService.signIn({login: this.login, password: this.password})
            }
        },
        controllerAs: 'user'
    }
});