angular.module('mailApp', []);

angular.module('mailApp').factory('dirController', function() {
    var _activeDir = 'Loading',
        initialization = true;

    function finishInit() {
        initialization = false;
    }

    function setActiveDir(val) {
        if (initialization) return;
        _activeDir = val;
    }

    function compareDir(val) {
        return val === _activeDir;
    }

    function setDirActiveClass(val) {
        var activeClass = _activeDir === val ? 'activeDir' : '';
        return activeClass;
    }

    return {
        finishInit: finishInit,
        checkDirClass: setDirActiveClass,
        setActiveDir: setActiveDir,
        compareDir: compareDir
    }
});

angular.module('mailApp').factory('letterController', function($q, $http, dirController) {
    var base = {},
        selected = {};

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

    function setInfo(scope) {
        if (selected.letter.info) return;
        selected.letter.info = {
            positionNow: {
                index: scope.$index,
                directory: scope.directory
            }
        }
    }

    function selectLetter(scope) {
        selected.letter = scope.letter;
        setInfo(scope);
    }

    function moveToDir(to, remove) {
        selected.letter.info.positionPrev = selected.letter.info.positionNow;
        var now = selected.letter.info.positionNow;
        base.letters[now.directory].splice(now.index, 1);
        if(remove) return;
        selected.letter.info.positionNow = {
            index: to.index,
            directory: to.directory
        };
        base.letters[to.directory].splice(to.index, 0, selected.letter);
    }

    function removeLetter(scope) {
        if(scope) selectLetter(scope);
        if (selected.letter.info.positionNow.directory === 'trash') {
            moveToDir(null, true);
            dirController.setActiveDir('trash');
        } else {
            moveToDir({directory: 'trash', index: 0})
        }
    }

    function recoverLetter() {
        var to = selected.letter.info.positionPrev;
        moveToDir({directory: to.directory, index: to.index})
    }

    return {
        base: base,
        select: selectLetter,
        selected: selected,
        remove: removeLetter,
        recover: recoverLetter
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