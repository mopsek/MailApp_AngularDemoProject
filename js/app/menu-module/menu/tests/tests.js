'use strict';

describe('tests', function () {

    beforeEach(module('mailApp'));

    describe('menu tests', function() {
        var controller,
            $scope,
            element,
            scope,
            authorizationService,
            stateService,
            letterService,
            $httpBackend,
            $timeout,
            $state,
            $rootScope;

        beforeEach(inject(function (_$rootScope_, $compile, _$httpBackend_, _authorizationService_, _$timeout_, _stateService_,
                                    mails, users, _$state_, _letterService_) {
            authorizationService = _authorizationService_;
            stateService = _stateService_;
            letterService = _letterService_;
            $httpBackend = _$httpBackend_;
            $timeout = _$timeout_;
            $state = _$state_;
            $rootScope = _$rootScope_;

            $scope = $rootScope.$new();
            element = angular.element('<menu></menu>');
            $compile(element)($scope);
            $scope.$digest();
            scope = element.isolateScope();
            controller = scope.menu;

            $httpBackend.whenGET('data/JSON/users.json').respond(users);
            $httpBackend.whenGET('data/JSON/mails.json').respond(mails);
            $httpBackend.whenGET(/\.html$/).respond(200, '');
        }));

        it('check properties', function() {
            expect(controller.setDirectory).toEqual(stateService.setActiveState);
            expect(controller.currentState).toEqual(stateService.currentState);
            expect(controller.remove).toEqual(letterService.removeLetter);
            expect(controller.recover).toEqual(letterService.recoverLetter);
            expect(controller.send).toEqual(letterService.moveNewLetter);
            expect(controller.edit).toEqual(letterService.editDraft);
            expect(controller.loginOut).toEqual(authorizationService.loginOut);
        });

        it('create new letter', function() {
            spyOn(stateService, 'setActiveState');
            controller.newLetter();
            expect(letterService.newLetter.letter).toBeDefined();
            expect(stateService.setActiveState).toHaveBeenCalled();
        });

        it('check replay function', function() {
            spyOn(stateService, 'setActiveState');
            letterService.selected.letter = {
                sender: 'test'
            };
            controller.replay();

            expect(letterService.newLetter.letter.to).toBe('test');
            expect(stateService.setActiveState).toHaveBeenCalled();
        });

        it('should get preview dir', function(done) {
            authorizationService.signIn({login: "test", password: "123"})
                .then(() => {
                    setTimeout(() => {
                        letterService.selected.letter = {};
                        stateService.setActiveState('preview', {index: 1, dir: 'inbox'});
                        $rootScope.$digest();
                        expect(controller.getPreviewDir()).toBe('inbox');
                        done();
                    }, 1000);
                });

            $timeout.flush();
            $httpBackend.flush();
        });

        it('should check click event', function() {
            var el = document.createElement('n');
            el.id = 'settingsButton';

            scope.clickEvent({target: el});
            $rootScope.$digest();

            expect(scope.showMenu).toBe(true);
            expect(el.classList.contains('activeSetting')).toBe(true);

        })

    });

});