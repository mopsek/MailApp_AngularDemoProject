angular.module('mailApp', []);

angular.module('mailApp').factory('dirController', function() {
    var _activeDir = 'Loading';

    function setActiveDir(val) {
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
        checkDirClass: setDirActiveClass,
        setActiveDir: setActiveDir,
        compareDir: compareDir
    }
});

angular.module('mailApp').factory('letterController', function($q, $http) {
    function initialisation() {
        var def = $q.defer();
        setTimeout(function() {
            $http({method: 'GET', url: 'mails.json'}).
                success(function(data){
                    def.resolve(data)
                }).
                error(function(err,status){
                    console.log(err + status);
                });
        }, 5000);

        return def.promise;
    }

    return {
        init: initialisation
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