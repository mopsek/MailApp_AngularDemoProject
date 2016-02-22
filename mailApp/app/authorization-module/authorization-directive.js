angular.module('mailApp').directive('signIn', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/app/authorization-module/template/authorization.html',
        scope: {},
        controller: function(authorizationService){
            this.login = '';
            this.password = '';

            this.enter = function(e) {
                if (e.keyCode === 13) this.signIn();
            };

            this.signIn = function() {
                authorizationService.signIn({login: this.login, password: this.password})
            };

            this.clearLS = function() {
                if (!window.localStorage || !window.localStorage.users && !window.localStorage.letters) alert('Данных нет! Удалять нечего!');
                if (window.localStorage.users || window.localStorage.letters) {
                    window.localStorage.removeItem('users');
                    window.localStorage.removeItem('letters');
                    alert('Данные успешно удалены!');
                }
            }
        },
        controllerAs: 'user'
    }
});