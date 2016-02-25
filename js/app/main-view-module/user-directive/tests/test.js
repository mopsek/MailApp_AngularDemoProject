'use strict';

describe('user-directive tests', function () {

    beforeEach(module('mailApp'));

    var $scope,
        element,
        scope,
        letterService,
        dataService,
        stateService;

    beforeEach(inject(function($rootScope, $compile, $httpBackend, _letterService_, _dataService_, _stateService_) {
        $httpBackend.whenGET(/\.html$/).respond(200, '');
        letterService = _letterService_;
        dataService = _dataService_;
        stateService = _stateService_;

        spyOn(dataService, 'saveUserToStorage');
        spyOn(stateService, 'setActiveState');

        $scope = $rootScope.$new();
        element = angular.element('<user></user>');
        $compile(element)($scope);
        $scope.$digest();
        scope = element.scope();
    }));

    it('check property', function() {
        expect(scope.editMode).toBe(false);
    });

    it('check toggleMode method', function() {
        scope.toggleMode();
        expect(scope.editMode).toBe(true);
        expect(dataService.saveUserToStorage).toHaveBeenCalled();
    });

    it('check selectUser method', function() {
        scope.user = {
            email: 'test',
            name: 'Tester'
        };
        scope.selectUser();

        expect(letterService.selected.user).toBe(scope.user.name);
        expect(stateService.setActiveState).toHaveBeenCalled();
    })

});
