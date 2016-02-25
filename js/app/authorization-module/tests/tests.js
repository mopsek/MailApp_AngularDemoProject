'use strict';

describe('tests', function () {

    beforeEach(module('mailApp'));

    describe('//', function() {
        var controller,
            $scope,
            element,
            scope,
            authorizationService;

        beforeEach(inject(function ($rootScope, $compile, $httpBackend, _authorizationService_) {
            $httpBackend.whenGET(/\.html$/).respond(200, '');
            authorizationService = _authorizationService_;

            spyOn(authorizationService, 'signIn');

            $scope = $rootScope.$new();
            element = angular.element('<sign-in></sign-in>');
            $compile(element)($scope);
            $scope.$digest();
            scope = element.isolateScope();
            controller = scope.user;
        }));

        it('check properties', function() {
            expect(controller.login).toBeDefined();
            expect(controller.password).toBeDefined();
        });

        it('check signIn func', function() {
            controller.signIn();
            expect(authorizationService.signIn).toHaveBeenCalled();
        });

        it('check enter func', function() {
            spyOn(controller, 'signIn');
            controller.enter({keyCode: 13});
            expect(controller.signIn).toHaveBeenCalled()
        });

        it('should reject clearLS', function() {
            spyOn(window, 'alert');
            controller.clearLS();
            expect(window.alert).toHaveBeenCalled()
        });

        it('should clearLS', function() {
            window.localStorage.users = {};
            controller.clearLS();
            expect(window.localStorage.users).toBeUndefined()
        })
    });

});