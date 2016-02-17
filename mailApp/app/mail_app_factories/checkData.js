angular.module('mailApp').factory('checkData', function($http, $state, letterController, dirController) {

    var permission = false;

    function getPermission() {
        return permission;

    }

    function continueSession() {
        $http({method: 'GET', url: 'mails/mails.json'}).
            success(function (data) {
                permission = true;
                letterController.base.letters = data;
                dirController.finishInit();
            }).
            error(function (err, status) {
                console.log(err + status);
            });
    }

    function loginOut() {
        document.cookie = 'session=' + '; max-age=0';
        permission = false;
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
                    permission = true;
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