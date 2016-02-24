'use strict';

let dirTemplate = require('./template/directories-menu.html');

module.exports = function () {
    return {
        restrict: 'E',
        template: dirTemplate,
        controller: function (stateService) {
            this.set = stateService.setActiveState;
            this.checkClass = stateService.checkDirClass;
        },
        controllerAs: 'directory'
    }
};