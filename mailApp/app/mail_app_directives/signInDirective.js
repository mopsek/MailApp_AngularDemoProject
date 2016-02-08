angular.module('mailApp').directive('signIn', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/signIn.html',
        scope: {},
        controller: function(checkData){
            this.login = '';
            this.password = '';

            this.enter = function(e) {
                if (e.keyCode === 13) this.signIn();
            };

            this.signIn = function() {
                checkData.signIn({login: this.login, password: this.password})
            }
        },
        controllerAs: 'user'
    }
});