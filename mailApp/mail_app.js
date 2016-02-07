angular.module('mailApp', ['ui.router']);

angular.module('mailApp').factory('dirController', function($state, $timeout) {
    var initialization = true,
        showMenu = false;

    function getState() {
        return  $state.current.name.slice(5);
    }

    function finishInit() {
        initialization = false;
    }

    function setActiveDir(val, params_obj) {
        if (initialization) return;
        if (val === 'preview') {
            $state.go('mail.' + val, {directory: params_obj.dir, index: params_obj.index});
            return;
        }
        $state.go('mail.' + val)
    }

    var classD = 'activeDir';

    function setDirActiveClass(val) {
        var activeClass = getState() === val ? classD : '';

        return activeClass;
    }

    return {
        showMenu: showMenu,
        finishInit: finishInit,
        checkDirClass: setDirActiveClass,
        setActiveDir: setActiveDir,
        currentState: getState
    }
});

angular.module('mailApp').factory('letterController', function($q, $http, dirController, $stateParams) {
    var base = {},
        selected = {},
        newLetter = {
            letter: {}
        };


    base.users = window.localStorage.users ? JSON.parse(window.localStorage.users) : getUsers();

    function getUsers() {
        $http.get('mails/users.json').
            success(function(data) {
                base.users = data;
            }).
            error(function(err,status){
                console.log(err + status);
            });
    }

    function saveUsersToStorage() {
        if (!window.localStorage) return;
        window.localStorage.users = JSON.stringify(base.users);
    }

    (function initialisation() {
        var def = $q.defer();
        setTimeout(function() {
            $http({method: 'GET', url: 'mails/mails.json'}).
                success(function(data){
                    def.resolve(data)
                }).
                error(function(err,status){
                    console.log(err + status);
                });
        }, 5000);

        return def.promise;
    })().then(function(data) {
        base.letters = data;
        dirController.finishInit();
        dirController.setActiveDir('inbox');
    });

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
        removeLetter: removeLetter,
        recoverLetter: recoverLetter,
        moveNewLetter: moveNewLetter,
        editDraft: editDraft,
        toggleFavorite: toggleFavorite,
        saveUserToStorage: saveUsersToStorage
    }

});

angular.module('mailApp').factory('animating', function() {
    function light(elem) {
        var shadow1 = '3px 0px 9px rgba(0, 255, 0, ',
            shadow2 = ')',
            opacity = 0;

        function incr() {
            if (opacity < 0.9) {
                opacity += 0.05;
                elem.style.textShadow = shadow1 + opacity + shadow2;
                setTimeout(incr, 75);
            } else return decr();
        }

        function decr() {
            if (opacity > 0.2) {
                opacity -= 0.05;
                elem.style.textShadow = shadow1 + opacity + shadow2;
                setTimeout(decr, 75);
            } else return incr();
        }

        incr();
    }

    function addComa(elem) {
        function add() {
            if(elem.innerHTML.length === 21) elem.innerHTML = 'Loading letters';
            elem.innerHTML += '.';
            setTimeout(add, 500)
        }
        add()
    }

    function loading(element) {
        light(element);
        addComa(element)
    }

    return {
        loading: loading

    }
});

angular.module('mailApp').filter('short_content', function() {
    return function(content) {
        return content.slice(0, 220) + '...';
    }
});