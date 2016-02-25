'use strict';

describe('tests', function () {

    beforeEach(module('mailApp'));

    var stateService,
        letterService,
        dataService,
        $scope,
        element,
        scope;

    beforeEach(inject(function(_stateService_, _letterService_, _dataService_, $rootScope, $compile, $httpBackend) {
        stateService = _stateService_;
        letterService = _letterService_;
        dataService = _dataService_;

        $scope = $rootScope.$new();
        element = angular.element('<contacts></contacts>');
        $compile(element)($scope);
        $scope.$digest();
        scope = element.isolateScope();
        scope.users = [];

        spyOn(dataService, 'saveUserToStorage');
        spyOn(stateService, 'setActiveState')
    }));

    it('check properties', function() {
        expect(scope.newUser).toBeDefined();
    });

    it('should add user', function() {
        scope.newUser = {
            test: 'test'
        };
        scope.addContact();

        expect(scope.users[scope.users.length - 1].test).toBe('test');
        expect(scope.newUser).toEqual({});
        expect(dataService.saveUserToStorage).toHaveBeenCalled()
    });

    it('should remove contact', function() {
        scope.users[0] = 'test';
        scope.removeContact(0);

        expect(scope.users.length).toBe(0);
        expect(dataService.saveUserToStorage).toHaveBeenCalled()
    });

    it('check mailTo function', function() {
        let mail = 'test';
        scope.mailTo(mail);

        expect(letterService.newLetter.letter.to).toBe(mail);
        expect(stateService.setActiveState).toHaveBeenCalled();
    })

});