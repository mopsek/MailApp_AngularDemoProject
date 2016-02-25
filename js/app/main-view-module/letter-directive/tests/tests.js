'use strict';

describe('tests', function () {

    beforeEach(module('mailApp'));

    var stateService,
        letterService,
        dataService,
        $scope,
        element,
        scope;

    beforeEach(inject(function (_stateService_, _letterService_, _dataService_, $rootScope, $compile) {
        stateService = _stateService_;
        letterService = _letterService_;
        dataService = _dataService_;

        $scope = $rootScope.$new();
        element = angular.element('<letter></letter>');
        $compile(element)($scope);
        //$scope.$digest();
        scope = element.scope();

        spyOn(letterService, 'removeLetter');
        spyOn(stateService, 'setActiveState');
        spyOn(dataService, 'saveLettersToStorage');
        spyOn(letterService,'toggleFavorite');
    }));

    it('check remove method', function() {
        scope.remove();

        expect(letterService.removeLetter).toHaveBeenCalled()
    });

    it('check preview method', function() {
        dataService.base.letters = {
            inbox: [{directory: 'inbox', unread: true}]
        };
        var obj = {
            letter: dataService.base.letters['inbox'][0],
            directory: 'inbox'
        };
        scope.preview(obj);

        expect(obj.letter.unread).toBe(false);
        expect(stateService.setActiveState).toHaveBeenCalled();
        expect(dataService.saveLettersToStorage).toHaveBeenCalled();
    });

    it('check toggleFavorite method', function() {
        scope.toggleFavorite();

        expect(letterService.toggleFavorite).toHaveBeenCalled();
    });

    it('method should return class name', function() {
        scope.letter = {
            unread: true
        };
        expect(scope.checkUnreadClass()).toBe('unread');
    });

    it('method should return favorite class', function() {
        scope.letter = {
            favorite: true
        };
        expect(scope.checkFavorite()).toBe('activeFavorite');
    })



});