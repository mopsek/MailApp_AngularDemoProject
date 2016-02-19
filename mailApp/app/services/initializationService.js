'use strict';

angular.module('mailApp').factory('initializationService', function() {
    var initialization = true;

    function getInit() {
        return initialization;
    }

    function finishInit() {
        initialization = false;
    }

    function resetInit() {
        initialization = true;
    }

    return {
        getInit: getInit,
        finishInit: finishInit,
        resetInit: resetInit
    }
});

