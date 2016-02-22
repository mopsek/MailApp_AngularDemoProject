'use strict';

angular.module('mailApp').factory('dataService', function($rootScope, $http, $q, $timeout, initializationService, stateService) {
    var base = {};

    function getUsers() {
        return $http.get('data/JSON/users.json').
            then(function(data) {
                base.users = data.data;
                return data.data;
            }, function(err,status){
                console.log(err + status);
            });
    }

    function getLetters() {
        var def = $q.defer();

        $timeout(function () {
            if (window.localStorage.letters) {
                let data = {};
                data.data = JSON.parse(window.localStorage.letters);
                def.resolve(data);
            }

            $http({method: 'GET', url: 'data/JSON/mails.json'}).
                then((data) => { def.resolve(data)}, (err) => console.log(err + status));

        }, 5000);

        return def.promise;
    }

    function saveLettersToStorage() {
        if (!window.localStorage) return;
        window.localStorage.letters = JSON.stringify(base.letters);
    }

    function saveUsersToStorage() {
        if (!window.localStorage) return;
        window.localStorage.users = JSON.stringify(base.users);
    }

    function initialisation() {
        base.users = window.localStorage.users ? JSON.parse(window.localStorage.users) : undefined;
        if (!base.users) getUsers();

        return getLetters()
            .then(function (data) {
                base.letters = data.data;
                initializationService.finishInit();
                stateService.setActiveState('inbox');
                document.cookie = 'session=' + (Math.random() + '').slice(2);
                return data.data;
            });
    }

    function resetBase() {
        delete base.letters;
        delete base.users;
    }

    return {
        base: base,
        init: initialisation,
        saveUserToStorage: saveUsersToStorage,
        saveLettersToStorage: saveLettersToStorage,
        getUsers: getUsers,
        getLetters: getLetters,
        resetBase: resetBase
    }
});