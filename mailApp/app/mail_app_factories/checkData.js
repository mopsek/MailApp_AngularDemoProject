angular.module('mailApp').factory('checkData', function($http, $state, letterController, dirController) {

    function getPermission() {
        return !!(document.cookie.indexOf('session') + 1);
    }

    function continueSession() {
        $http({method: 'GET', url: 'mails/mails.json'}).
            success(function (data) {
                letterController.base.letters = data;
                dirController.finishInit();
                permission = true;
            }).
            error(function (err, status) {
                console.log(err + status);
            });
    }

    function loginOut() {
        document.cookie = 'session=' + '; max-age=0'
        letterController.loginOut();
        $state.go('signIn');
    }

    function signIn(data) {
        $http.get('mails/usersProfiles.json')
            .success(function(profiles) {
                if (!profiles[data.login]) {
                    alert('Такого пользователя не существует!');
                    return;
                }
                if (profiles[data.login] === data.password) {
                    document.cookie = 'session=' + (Math.random() + '').slice(2);
                    $state.go('mail.loading');
                    letterController.init();
                } else {
                    alert('Введенный пороль не верен!')
                }
            })
            .error(function() {
                alert('Не удалось загрузить базы...')
            })
    }

    return {
        getPermission: getPermission,
        signIn: signIn,
        loginOut: loginOut,
        continueSession: continueSession
    }
});