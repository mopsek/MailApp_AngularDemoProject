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
