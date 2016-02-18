'use strict';

angular.module('mailApp').factory('letterController', function($q, $http, dirController, $stateParams, $timeout) {
    var base = {},
        selected = {},
        newLetter = {
            letter: {}
        };


    base.users = window.localStorage.users ? JSON.parse(window.localStorage.users) : undefined;
    if (!base.users) getUsers();

    function loginOut() {
        selected = base = {};
        dirController.resetInit();
    }

    function getUsers() {
        return $http.get('json-data/users.json').
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

                $http({method: 'GET', url: 'json-data/mails.json'}).
                    then((data) => def.resolve(data), (err) => console.log(err + status));

            }, 5000);

            return def.promise;
        })().then(function (data) {
            base.letters = data.data;
            dirController.finishInit();
            dirController.setActiveDir('inbox');
            document.cookie = 'session=' + (Math.random() + '').slice(2);
            return data.data;
        });


    }

    function moveToDir(dir) {
        base.letters[dir].push(selected.letter);
    }

    function removeFromDir() {
        var currentDir = dirController.currentState();
        if (currentDir === 'preview') currentDir = $stateParams.directory;
        if (currentDir === 'favorites' || currentDir === 'filtered') currentDir = selected.letter.directory;
        var index = base.letters[currentDir].indexOf(selected.letter);
        base.letters[currentDir].splice(index, 1)
    }

    function removeLetter(letter) {
        if (letter) selected.letter = letter;
        var currentDir = dirController.currentState();
        if (currentDir === 'preview') currentDir = $stateParams.directory;
        if (selected.letter.favorite) {
            toggleFavorite(selected.letter);
        }
        removeFromDir();
        dirController.setActiveDir(currentDir);
        if(selected.letter.deleted === false && selected.letter.directory !== 'drafts') {
            selected.letter.deleted = true;
            moveToDir('trash')
        }
    }

    function recoverLetter() {
        removeFromDir();
        moveToDir(selected.letter.directory);
        selected.letter.deleted = false;
        dirController.setActiveDir(selected.letter.directory)
    }

    function setInfo(dir) {
        var obj = {
            sender: 'I',
            date: new Date().getTime(),
            favorite: false,
            unread: false,
            deleted: false,
            directory: dir
        };

        for (var key in obj) selected.letter[key] = obj[key];
        selected.letter.tittle = selected.letter.tittle || 'Без темы...';
        selected.letter.content = selected.letter.content || '';
    }

    function moveNewLetter(dir) {
        selected.letter = newLetter.letter;
        setInfo(dir);
        if (dir === 'sent' && !selected.letter.to) {
            alert('Нет адреса получателя!!!');
            return;
        }
        moveToDir(dir);
        dirController.setActiveDir(dir);
        newLetter.letter = {};
    }

    function editDraft() {
        newLetter.letter = selected.letter;
        selected.letter = {};
        removeFromDir();
        dirController.setActiveDir('newLetterForm');
    }

    function toggleFavorite(letter) {
        letter.favorite = !letter.favorite;
    }

    return {
        base: base,
        selected: selected,
        newLetter: newLetter,
        init: initialisation,
        removeLetter: removeLetter,
        recoverLetter: recoverLetter,
        moveNewLetter: moveNewLetter,
        editDraft: editDraft,
        toggleFavorite: toggleFavorite,
        saveUserToStorage: saveUsersToStorage,
        loginOut: loginOut,
        getUsers: getUsers
    }

});