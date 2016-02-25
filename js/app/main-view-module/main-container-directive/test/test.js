'use strict';

describe('tests', function () {

    beforeEach(module('mailApp'));

    describe('//', function () {
        var controller,
            $scope,
            element,
            scope,
            letterService,
            dataService;

        beforeEach(inject(function ($rootScope, $compile, $httpBackend, _letterService_, _dataService_) {
            $httpBackend.whenGET(/\.html$/).respond(200, '');
            letterService = _letterService_;
            dataService = _dataService_;

            $scope = $rootScope.$new();
            element = angular.element('<main-container></main-container>');
            $compile(element)($scope);
            $scope.$digest();
            scope = element.scope();
            controller = scope.directory;
        }));

        it('should check properties', function() {
            expect(controller.base).toBe(dataService.base);
            expect(controller.selected).toBe(letterService.selected);
            expect(controller.newLetter).toBe(letterService.newLetter);
        })


    });
});