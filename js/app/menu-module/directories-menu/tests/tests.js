'use strict';

describe('tests', function () {

    beforeEach(module('mailApp'));

    var controller,
        $scope,
        element,
        scope,
        stateService;


    beforeEach(inject(function($rootScope, $compile, $httpBackend, _stateService_) {
        $httpBackend.whenGET(/\.html$/).respond(200, '');
        stateService = _stateService_;

        $scope = $rootScope.$new();
        element = angular.element('<mail-directories></mail-directories>');
        $compile(element)($scope);
        $scope.$digest();
        scope = element.scope();
        controller = scope.directory;
    }));

    it('check methods', function() {
        expect(controller.set).toBeDefined();
        expect(controller.checkClass).toBeDefined();
        expect(controller.set).toEqual(stateService.setActiveState);
        expect(controller.checkClass).toEqual(stateService.checkDirClass);
    })

});