angular.module('mailApp').factory('authorizationService', function($http, $state, letterService, initializationService, dataService) {

    var permission = false;

    function getPermission() {
        return permission;

    }

    function setPermission(val) {
        if(val === true || val === false) permission = val;
    }

    function continueSession() {
        $http({method: 'GET', url: 'data/JSON/mails.json'}).
            success(function (data) {
                permission = true;
                dataService.base.letters = data;
                initializationService.finishInit();
            }).
            error(function (err, status) {
                console.log(err + status);
            });
    }

    function loginOut() {
        document.cookie = 'session=' + '; max-age=0';
        permission = false;
        letterService.resetSelected();
        dataService.resetBase();
        initializationService.resetInit();
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
            dataService.init();
        } else {
            alert('Введенный пороль не верен!')
        }
    }
/*
    function signIn(data) {
        $http.get('data/usersProfiles.json')
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
                    dataService.init();
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