angular.module('main-view').directive('mainContainer', function() {
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
});