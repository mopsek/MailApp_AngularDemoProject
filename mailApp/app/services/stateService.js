angular.module('mailApp').factory('stateService', function($state, initializationService) {

    function getState() {
        return  $state.current.name.slice(5);
    }


    function setActiveState(val, params_obj) {
        if (initializationService.getInit()) return;
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
        checkDirClass: setDirActiveClass,
        setActiveState: setActiveState,
        currentState: getState
    }
});
