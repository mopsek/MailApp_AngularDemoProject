'use strict';

describe('tests', function () {

    beforeEach(module('mailApp'));

    describe('Data Service tests', function () {

        var $httpBackend,
            $rootScope,
            $timeout,
            dataService,
            initializationService,
            stateService;

        beforeEach(inject(function (_$httpBackend_, mails, users, _$rootScope_, _$timeout_, _dataService_, _initializationService_, _stateService_) {
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            $timeout = _$timeout_;
            dataService = _dataService_;
            initializationService = _initializationService_;
            stateService = _stateService_;

            spyOn(initializationService, 'finishInit');
            spyOn(stateService, 'setActiveState');

            window.localStorage.removeItem('letters');
            window.localStorage.removeItem('users');

            $httpBackend.whenGET('data/JSON/users.json').respond(users);
            $httpBackend.whenGET('data/JSON/mails.json').respond(mails);
        }));


        it('should load users', function(done) {
            expect(dataService.base).toEqual({});

            dataService.getUsers()
                .then((data) => {
                    expect(data[0]["email"]).toBe("ivanov@mail.ru");
                    expect(dataService.base.users).toBeDefined();
                    done()
                });

            $httpBackend.flush();
        });

        it('should load letters', function(done) {
            expect(dataService.base).toEqual({});

            dataService.getLetters()
                .then((data) => {
                    expect(data.data["inbox"][0]["to"]).toBe("Me");
                    done();
                });

            $timeout.flush();
            $httpBackend.flush();
        });

        it('should make initialization', function(done) {
            expect(dataService.base).toEqual({});


            dataService.init()
                .then(() => {
                    expect(dataService.base.letters).toBeDefined();
                    expect(initializationService.finishInit).toHaveBeenCalled();
                    expect(stateService.setActiveState).toHaveBeenCalled();
                    expect(dataService.base.users).toBeDefined();
                    done()
                });

            $timeout.flush();
            $httpBackend.flush();
        });

        it('should reset base', function(done) {
            dataService.init()
                .then(() => {
                    dataService.resetBase();
                    expect(dataService.base).toEqual({});
                    done();
                });

            $timeout.flush();
            $httpBackend.flush();
        });

        it('should save users to storage', function(done) {
            dataService.getUsers().
                then(() => {
                    dataService.saveUserToStorage();
                    expect(window.localStorage.users).toBeDefined();
                    done();
                });

            $httpBackend.flush();
        });

    });

    describe('Initialization Service tests', function() {
        var initializationService;

        beforeEach(inject(function(_initializationService_) {
            initializationService = _initializationService_;
        }));

        it('should check init', function() {
            expect(initializationService.getInit()).toBe(true);
            initializationService.finishInit();
            expect(initializationService.getInit()).toBe(false);
            initializationService.resetInit();
            expect(initializationService.getInit()).toBe(true);
        });


    });

    describe('Letter Service tests', function() {

        var letterService,
            authorizationService,
            $state,
            $rootScope,
            $timeout,
            $httpBackend,
            dataService,
            stateService;

        beforeEach(inject(function(_$httpBackend_, _letterService_, _authorizationService_, _$rootScope_,
                                   _$timeout_, _$state_, mails, users, _dataService_, _stateService_){
            letterService = _letterService_;
            authorizationService = _authorizationService_;
            $state = _$state_;
            $rootScope = _$rootScope_;
            $timeout = _$timeout_;
            $httpBackend = _$httpBackend_;
            dataService = _dataService_;
            stateService = _stateService_;


            spyOn(stateService, 'setActiveState');

            window.localStorage.removeItem('letters');
            window.localStorage.removeItem('users');

            $httpBackend.whenGET('data/JSON/mails.json').respond(mails);
            $httpBackend.whenGET('data/JSON/users.json').respond(users);
            $httpBackend.whenGET(/\.html$/).respond(200, '');
        }));

        beforeEach(function() {
            authorizationService.signIn({login: "test", password: "123"});
            $timeout.flush();
            $httpBackend.flush();
            letterService.selected.letter = dataService.base.letters.inbox[1];
        });

        it('should move letter to arg directory', function() {
            letterService.moveToDir('trash');
            expect(dataService.base.letters['trash'].indexOf(letterService.selected.letter) + 1).toBeGreaterThan(0);
        });

        it('should remove letter from dir', function() {
            spyOn(stateService, 'currentState').and.returnValue('inbox');
            letterService.removeFromDir();

            expect(stateService.currentState).toHaveBeenCalled();
            expect(dataService.base.letters['inbox'].indexOf(letterService.selected.letter) + 1).not.toBeGreaterThan(0);
        });

        it('should remove letter', function() {
            spyOn(stateService, 'currentState').and.returnValue('inbox');
            letterService.removeLetter();

            expect(stateService.currentState).toHaveBeenCalled();
            expect(letterService.selected.letter.favorite).toBe(false);
            expect(stateService.setActiveState).toHaveBeenCalled();
            expect(dataService.base.letters['inbox'].indexOf(letterService.selected.letter) + 1).not.toBeGreaterThan(0);
            expect(dataService.base.letters['trash'].indexOf(letterService.selected.letter) + 1).toBeGreaterThan(0);
            expect(letterService.selected.letter.deleted).toBe(true);
        });

        it('should recover letter', function() {
            spyOn(stateService, 'currentState').and.returnValue('trash');
            letterService.selected.letter = dataService.base.letters.trash[0];
            $state.go('mail.trash');
            $rootScope.$digest();
            letterService.recoverLetter();
            let index = dataService.base.letters['trash'].indexOf(letterService.selected.letter);
            expect(index + 1).not.toBeGreaterThan(0);
            expect(dataService.base.letters[letterService.selected.letter.directory].indexOf(letterService.selected.letter) + 1).toBeGreaterThan(0);
            expect(letterService.selected.letter.deleted).toBe(false);
            expect(stateService.setActiveState).toHaveBeenCalled();
        });

        it('should move new letter', function() {
            letterService.newLetter.letter = {to: 'Vasya'};
            letterService.moveNewLetter('sent');

            expect(Object.keys(letterService.selected.letter).length).toBeGreaterThan(1);
            expect(dataService.base.letters['sent'].indexOf(letterService.selected.letter) + 1).toBeGreaterThan(0);
            expect(stateService.setActiveState).toHaveBeenCalled();
            expect(letterService.newLetter.letter).toEqual({});
        });

        it('should edit draft', function() {
            spyOn(stateService, 'currentState').and.returnValue('drafts');
            letterService.selected.letter = dataService.base.letters.drafts[0];
            let primaryLength = dataService.base.letters.drafts.length;
            letterService.editDraft();

            expect(letterService.newLetter.letter).not.toEqual({});
            expect(dataService.base.letters.drafts.length).toBeLessThan(primaryLength);
            expect(stateService.setActiveState).toHaveBeenCalled();
        });

        it('should toggle favorite', function() {
            let primaryValue = letterService.selected.letter.favorite;
            letterService.toggleFavorite(letterService.selected.letter);

            expect(letterService.selected.letter.favorite).not.toBe(primaryValue);
        });

        it('should reset selected', function() {
            letterService.resetSelected();

            expect(letterService.selected.letter).toBeUndefined();
        })
    });

    describe('State Service tests', function() {

        var $state,
            $rootScope,
            stateService,
            authorizationService,
            $httpBackend,
            $timeout;

        beforeEach(inject(function(_$state_, _$rootScope_, _stateService_, _authorizationService_, _$httpBackend_, _$timeout_, users, mails) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            stateService = _stateService_;
            authorizationService = _authorizationService_;
            $httpBackend = _$httpBackend_;
            $timeout = _$timeout_;


            $httpBackend.whenGET('data/JSON/users.json').respond(users);
            $httpBackend.whenGET('data/JSON/mails.json').respond(mails);
            $httpBackend.whenGET(/\.html$/).respond(200, '');
        }));

        it('should not change state', function() {
            $rootScope.$digest();
            let stateNow = $state.current.name;
            stateService.setActiveState('trash');
            $rootScope.$digest();
            expect($state.current.name).toBe(stateNow);
        });

        it('Must change state and return active state', function(done) {
            expect(stateService.currentState()).toBe('');
            authorizationService.signIn({login: "test", password: "123"})
                .then(() => {
                    expect(stateService.currentState()).toBe('inbox');
                    setTimeout(() => {
                        stateService.setActiveState('sent');
                        $rootScope.$digest();
                        expect(stateService.currentState()).toBe('sent');
                        stateService.setActiveState('trash');
                        $rootScope.$digest();
                        expect(stateService.currentState()).toBe('trash');
                        stateService.setActiveState('preview', {dir: 'sent', index: 0});
                        $rootScope.$digest();
                        expect(stateService.currentState()).toBe('preview');
                        done();
                    })

                });

            $timeout.flush();
            $httpBackend.flush();
        });

    });

    describe('Authorisation Service tests', function() {

        var $httpBackend,
            $state,
            dataService,
            authorizationService,
            letterService,
            initializationService;

        beforeEach(inject(function(_authorizationService_, _$httpBackend_, _$state_, users, mails,
                                   _dataService_, _letterService_, _initializationService_) {

            $httpBackend = _$httpBackend_;
            $state = _$state_;
            dataService = _dataService_;
            authorizationService = _authorizationService_;
            letterService = _letterService_;
            initializationService = _initializationService_;

            spyOn($state, 'go');
            spyOn(dataService, 'init');
            spyOn(letterService, 'resetSelected');
            spyOn(dataService, 'resetBase');
            spyOn(initializationService, 'resetInit');
            spyOn(initializationService, 'finishInit');

            $httpBackend.whenGET('data/JSON/users.json').respond(users);
            $httpBackend.whenGET('data/JSON/mails.json').respond(mails);
            $httpBackend.whenGET(/\.html$/).respond(200, '');
        }));

        it('should return permission', function() {
            expect(authorizationService.getPermission()).toBe(false);
        });

        it('should set permission', function() {
            authorizationService.setPermission(true);
            expect(authorizationService.getPermission()).toBe(true);
        });

        it('should sign in', function() {
            authorizationService.signIn({login: 'test', password: '123'});

            expect(authorizationService.getPermission()).toBe(true);
            expect($state.go).toHaveBeenCalled();
            expect(dataService.init).toHaveBeenCalled();
        });

        it('should sing out', function() {
            authorizationService.loginOut();

            expect(authorizationService.getPermission()).toBe(false);
            expect(letterService.resetSelected).toHaveBeenCalled();
            expect(dataService.resetBase).toHaveBeenCalled();
            expect(initializationService.resetInit).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalled();
        });

        it('should continue session', function(done) {
            authorizationService.continueSession().
                then(() => {
                    expect(authorizationService.getPermission()).toBe(true);
                    expect(dataService.base.letters).toBeDefined();
                    expect(initializationService.finishInit).toHaveBeenCalled();
                    done();
                });

            $httpBackend.flush();
        });
    });

    describe('Animation Service tests', function() {

        var animationService,
            $timeout,
            $rootScope,
            element;

        beforeEach(inject(function(_animationService_, _$timeout_, _$rootScope_) {
            animationService = _animationService_;
            $timeout = _$timeout_;
            $rootScope = _$rootScope_;

            element = document.createElement('div');
        }));

        it('check addComa method', function(done) {
            animationService.addComa(element);
            setTimeout(() => {
                expect(element.innerHTML).not.toBe('');

                done();
            }, 1000);
        });

        it('check addComa long', function(done) {
            element.innerHTML = 'lllllllllllllllllll1l';
            animationService.addComa(element);
            setTimeout(() => {
                $rootScope.$digest();
                expect(element.innerHTML.indexOf('Loading letters') + 1).toBeGreaterThan(0);
                done();
            }, 1000);
        });

        it('check loading method', function(done) {
            var length = element.innerHTML.length;
            animationService.loading(element);

            setTimeout(() => {
                expect(element.innerHTML.length).toBeGreaterThan(length);
                done()
            }, 500)

        });
    })
});

