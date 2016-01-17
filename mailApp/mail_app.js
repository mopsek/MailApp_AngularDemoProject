angular.module('mailApp', []);

angular.module('mailApp').directive('letter', function() {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/letter.html',
        controller: function() {
            this.letter = {
                date: 'Fr, 20 january 2019',
                sender: 'Vasya Pupkin',
                title: 'New big title',
                content: 'adfjaksjfakef aefinka eflkanef ake flkaelf alekf alke faekf alekf ae' +
                'aefaekfeafklaefjalekjflakejflaeflkjaelkjfalneflkanefjnekjwnfkjwnf wefnwef ' +
                'wefwe wlekfwne fw'
            };
        },
        controllerAs: 'mail'
    };
});

angular.module('mailApp').controller('MyController', function() {
    this.x = {
        inbox: true,
        sent: false,
        cart: false
    };
    this.change = function(dir) {
        for (var prop in this.x) {
            this.x[prop] = false;
            if (prop === dir) this.x[prop] = true;
        }
    };
});

angular.module('mailApp').directive('mailDirectories', function () {
    return {
        restrict: 'E',
        templateUrl: 'mailApp/templates/mailDirectories.html',
        controller: function() {

        },
        controllerAs: 'mailDir'
    }
})