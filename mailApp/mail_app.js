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
       if (!scope.letter.fromDir) scope.letter.fromDir = scope.directory;
        scope.letter.info = {};
        scope.letter.info.dir = scope.directory;
        scope.letter.info.index = base.letters[scope.letter.info.dir].indexOf(selected.letter);

    }

    function selectLetter(scope) {
        selected.letter = scope.letter;
        setInfo(scope);
    }

    function createLetter() {
        selected.letter = {
            date: new Date().getTime(),
            sender: 'I',
            to: '',
            tittle: '',
            content: '',
            info: ''
        };
    }

    function removeFromDir() {
        var now = selected.letter.info;
        base.letters[now.dir].splice(now.index, 1);
    }

    function setToDir(to) {
        base.letters[to].push(selected.letter);
    }

    function removeLetter(scope, link) {
        if(scope) selectLetter(scope);
        if (link || (selected.letter.link && selected.letter.info.dir !== 'favorites')) {
            var fav = base.letters.favorites;
            fav.splice(fav.indexOf(link), 1);
            delete selected.letter.link;
            if (link) return;
        }
        switch (selected.letter.info.dir) {
            case 'drafts':
                removeFromDir();
                break;
            case 'favorites':
                var pos = base.letters[selected.letter.fromDir].indexOf(selected.letter);
                base.letters[selected.letter.fromDir].splice(pos, 1);
                delete selected.letter.link;
                removeFromDir();
                setToDir('trash');
                break;
            case 'trash':
                removeFromDir();
                break;
            default:
                removeFromDir();
                setToDir('trash');
        }
    }

    function recoverLetter() {
        var to = selected.letter.fromDir;
        removeFromDir();
        setToDir(to);
        dirController.setActiveDir(to);
    }

    return {
        base: base,
        select: selectLetter,
        selected: selected,
        remove: removeLetter,
        recover: recoverLetter,
        setTo: setToDir,
        create: createLetter
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