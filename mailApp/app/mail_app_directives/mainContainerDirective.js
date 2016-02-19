angular.module('mailApp').directive('mainContainer', function() {
    return {
        restrict:'AE',
        scope: true,
        controller: function(letterService, dataService) {
            var self = this;

            this.base = dataService.base;
            this.selected = letterService.selected;
            this.newLetter = letterService.newLetter;
        },
        controllerAs: 'directory'
    }
});