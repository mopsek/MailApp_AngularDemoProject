'use strict';

angular.module('mailApp').factory('dataService', function($http, $q, $timeout, initializationService, stateService) {
    var base = {};

    base.users = window.localStorage.users ? JSON.parse(window.localStorage.users) : undefined;
    if (!base.users) getUsers();


    function getUsers() {
        return $http.get('data/users.json').
            then(function(data) {
                base.users = data.data;
                return data.data;
            }, function(err,status){
                console.log(err + status);
            });

    }

    function saveUsersToStorage() {
        if (!window.localStorage) return;
        window.localStorage.users = JSON.stringify(base.users);
    }

    function initialisation() {

        return (function () {
            var def = $q.defer();

            $timeout(function () {

                $http({method: 'GET', url: 'data/mails.json'}).
                    then((data) => { def.resolve(data)}, (err) => console.log(err + status));

            }, 5000);

            return def.promise;
        })().then(function (data) {
            base.letters = data.data;
            initializationService.finishInit();
            stateService.setActiveState('inbox');
            document.cookie = 'session=' + (Math.random() + '').slice(2);
            return data.data;
        });


    }

    return {
        base: base,
        init: initialisation,
        saveUserToStorage: saveUsersToStorage,
        getUsers: getUsers
    }
});