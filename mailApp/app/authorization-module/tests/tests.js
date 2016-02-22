'use strict';

// Не РАБОТАЕТ!!!!!

describe('tests', function () {

    beforeEach(module('mailApp'));

    describe('//', function() {
        var controller,
            $scope,
            element,
            scope;

        beforeEach(inject(function ($rootScope, $compile, $httpBackend) {
            $httpBackend.whenGET(/\.html$/).respond(200, '');

            $scope = $rootScope.$new();
            element = angular.element('<sign-in></sign-in>');
            $compile(element)($scope);
            $scope.$digest();
            scope = element.isolateScope();
            console.log($compile(element)($scope));

        }));

        it('check properties', function() {


        })
    })

});