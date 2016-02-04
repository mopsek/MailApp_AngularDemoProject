angular.module('mailApp', ['ui.router']);

angular.module('mailApp').factory('dirController', function($state) {
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

    function setDirActiveClass(val) {
        var activeClass = getState() === val ? 'activeDir' : '';
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
        newLetter = {};


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
        base.letter[dir].push(selected.letter);
    }

    function removeFromDir() {
        console.log(dirController.currentState())
       // var index = base.letters[dirController.currentState()].indexOf(selected.letter);
        //base.letters[dirController.currentState()].splice(index, 1)
    }

    function removeLetter(letter) {
        if (letter) selected.letter = letter;
        removeFromDir();
        //dirController.setActiveDir(dirController.currentState());
       // if(selected.letter.deleted === false) {
       //     moveToDir('trash')
        //}
    }

    return {
        base: base,
        selected: selected,
        newLetter: newLetter,
        removeLetter: removeLetter,
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