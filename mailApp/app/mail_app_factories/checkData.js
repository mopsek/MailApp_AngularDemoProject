angular.module('mailApp').factory('checkData', function($http, $state, letterController, dirController) {

    var permission = false;

    function getPermission() {
        return permission;

    }

    function setPermission(val) {
        if(val === true || val === false) permission = val;
    }

    function continueSession() {
        $http({method: 'GET', url: 'json-data/json-data.json'}).
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
        if (data.login !== 'test') {
            alert('Такого пользователя не существует!');
            return;
        }
        if (data.login === 'test' && data.password === '123') {
            permission = true;
            $state.go('mail.loading');
            letterController.init();
        } else {
            alert('Введенный пороль не верен!')
        }
    }
/*
    function signIn(data) {
        $http.get('json-data/usersProfiles.json')
            .then(function(profiles) {
                profiles = profiles.data;
                if (!profiles[data.login]) {
                    alert('Такого пользователя не существует!');
                    return;
                }
                if (profiles[data.login] === data.password) {
                    alert('KH');
                    permission = true;
                    $state.go('mail.loading');
                    letterController.init();
                } else {
                    alert('Введенный пороль не верен!')
                }
            }, function() {
                alert('Не удалось загрузить базы...')
            });
    }
    */

    return {
        getPermission: getPermission,
        signIn: signIn,
        loginOut: loginOut,
        continueSession: continueSession,
        setPermission: setPermission
    }
});