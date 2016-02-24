'use strict';

module.exports = function() {
    return {
        restrict:'AE',
        scope: true,
        controller: function(letterService, dataService) {
            this.base = dataService.base;
            this.selected = letterService.selected;
            this.newLetter = letterService.newLetter;
        },
        controllerAs: 'directory'
    }
};