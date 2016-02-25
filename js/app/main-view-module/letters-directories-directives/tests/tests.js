'use strict';

describe('letter-directories-directive tests', function () {

    beforeEach(module('mailApp'));

    describe('drafts directive', function() {
        var $scope,
            element,
            scope;

        beforeEach(inject(function($rootScope, $compile) {
            $scope = $rootScope.$new();
            element = angular.element('<drafts></drafts>');
            $compile(element)($scope);
            $scope.$digest();
            scope = element.isolateScope();
        }));

        it('check property', function() {
            expect(scope.directory).toBe('drafts');
        });
    });

    describe('favorites directive', function() {
        var $scope,
            element,
            scope;

        beforeEach(inject(function($rootScope, $compile) {
            $scope = $rootScope.$new();
            $scope.inbox = [];
            $scope.sent = [];
            element = angular.element('<favorites inbox="inbox" sent="sent"></favorites>');
            $compile(element)($scope);
            $scope.$digest();
            scope = element.isolateScope();
        }));

        it('check property', function() {
            expect(scope.directory).toBe('favorites');
            expect(scope.letters).toBeDefined();
        });
    });

    describe('filtered directive', function() {
        var $scope,
            element,
            scope,
            controller,
            stateService;

        beforeEach(inject(function($rootScope, $compile, _stateService_) {
            $scope = $rootScope.$new();
            $scope.letters = [];
            $scope.user = [];
            element = angular.element('<filtered-letters letters="letters" user="user"></filtered-letters>');
            $compile(element)($scope);
            $scope.$digest();
            scope = element.isolateScope();
            controller = scope.filterDir;

            stateService = _stateService_;
            spyOn(stateService, 'setActiveState');
        }));

        it('check property', function() {
            expect(scope.directory).toBe('filtered');
        });


        it('check controller method', function() {
            controller.back();
            expect(stateService.setActiveState).toHaveBeenCalled();
        });
    });

    describe('inbox directive', function() {
        var $scope,
            element,
            scope;

        beforeEach(inject(function($rootScope, $compile) {
            $scope = $rootScope.$new();
            $scope.letters = [];
            $scope.user = [];
            element = angular.element('<inbox-letters></inbox-letters>');
            $compile(element)($scope);
            $scope.$digest();
            scope = element.isolateScope();
        }));

        it('check property', function() {
            expect(scope.directory).toBe('inbox');
        });
    });

    describe('sent directive', function() {
        var $scope,
            element,
            scope;

        beforeEach(inject(function($rootScope, $compile) {
            $scope = $rootScope.$new();
            $scope.letters = [];
            $scope.user = [];
            element = angular.element('<sent-letters></sent-letters>');
            $compile(element)($scope);
            $scope.$digest();
            scope = element.isolateScope();
        }));

        it('check property', function() {
            expect(scope.directory).toBe('sent');
        });
    });

    describe('trash directive', function() {
        var $scope,
            element,
            scope;

        beforeEach(inject(function($rootScope, $compile) {
            $scope = $rootScope.$new();
            $scope.letters = [];
            $scope.user = [];
            element = angular.element('<cart-letters></cart-letters>');
            $compile(element)($scope);
            $scope.$digest();
            scope = element.isolateScope();
        }));

        it('check property', function() {
            expect(scope.directory).toBe('trash');
        });
    })
});