describe('tests', function () {

    beforeEach(module('mailApp'));

    describe('Receive data tests', function () {

        var $httpBackend,
            letterController,
            $rootScope;

        beforeEach(inject(function (_$httpBackend_, _letterController_, _mails_, _users_, _$rootScope_) {
            $httpBackend = _$httpBackend_;
            letterController = _letterController_;
            $rootScope = _$rootScope_;

            $httpBackend.whenGET('json-data/users.json').respond(_users_);
            $httpBackend.whenGET('json-data/mails.json').respond(_mails_);
        }));


        it('should load users', function(done) {
            expect(letterController.base.users).not.toBeDefined();

            letterController.getUsers().
                then(function (d) {
                    expect(d[0]["email"]).toBe("ivanov@mail.ru");
                    expect(letterController.base.users[0]["email"]).toBe("ivanov@mail.ru");
                    done()
                });

            $httpBackend.flush();
        });


        // --------- V вот этот V -----------

       it('should load letters', function (done) {

            expect(letterController.base.letters).not.toBeDefined();

            letterController.init().
                then(function(d) {
                    expect(d["inbox"]).toBeDefined();
                    expect(letterController.base.letters).toBeDefined();
                    done();
                });

            $httpBackend.flush();
            $rootScope.$digest();
        });
    });

    describe('Directory Controller tests', function() {
        var letterController,
            dirController,
            $state,
            $rootScope;

        beforeEach(inject(function(_letterController_, _dirController_, _$state_, _$rootScope_,
        $httpBackend, users) {
            letterController = _letterController_;
            dirController = _dirController_;
            $state = _$state_;
            $rootScope = _$rootScope_;

            $httpBackend.whenGET('json-data/users.json').respond(users)
        }));

        it('should check init', function() {
            expect(dirController.getInit()).toBe(true);
            dirController.finishInit();
            expect(dirController.getInit()).toBe(false);
            dirController.resetInit();
            expect(dirController.getInit()).toBe(true);
        });


    });

    describe('Letter controller tests', function() {

        var letterController,
            dirController;

        beforeEach(inject(function(_letterController_, $rootScope, $httpBackend, mails, users, _dirController_){
            letterController =_letterController_;
            dirController = _dirController_;

            $httpBackend.whenGET('json-data/mails.json').respond(mails);
            $httpBackend.whenGET('json-data/users.json').respond(users);

            spyOn(dirController, 'resetInit')
        }));



        it('should reset base ', function() {
            letterController.loginOut();
            expect(letterController.base.letters).not.toBeDefined(); // ошибка тут
            expect(letterController.selected).toEqual({});
            expect(dirController.resetInit).toHaveBeenCalled();
        });


    });

    describe('State tests', function() {

        var $state,
            $rootScope,
            dirController;

        beforeEach(inject(function(_$state_, _$rootScope_, _dirController_, $httpBackend, users) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            dirController = _dirController_;

            $httpBackend.whenGET('json-data/users.json').respond(users);
        }));

        it('Must change state', function() {
            expect(dirController.currentState()).toBe('');
            $state.go('mail.inbox');
            $rootScope.$digest();
            expect($state.current.name).toBe('signIn');
        })
    });

    describe('Authorisation tests', function() {

        var checkData,
            $httpBackend,
            $rootScope,
            $state,
            letterController;

        //beforeEach(angular.mock.http.init);
        //afterEach(angular.mock.http.reset);

        beforeEach(inject(function(_checkData_, _$httpBackend_, profiles, _$rootScope_, _$state_, users, _letterController_) {
            checkData = _checkData_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            $state = _$state_;
            letterController = _letterController_;

            spyOn($state, 'go');
            spyOn(letterController, 'init');

            $httpBackend.whenGET('json-data/users.json').respond(users);
            $httpBackend.whenGET(/\.html$/).respond(200, '');

            jasmine.DEFAULT_TIMEOUT_INTERVAL = 9000;
        }));

        it('should sign in', function() {
            //$httpBackend.whenGET(/\.html$/).passThrough();
            expect(checkData.getPermission()).toBe(false);
            checkData.signIn({login: 'test', password: '123'});
            $rootScope.$digest();

            expect(checkData.getPermission()).toBe(true);
            expect($state.go).toHaveBeenCalled();
            expect(letterController.init).toHaveBeenCalled();
        /*
            setTimeout(function() {
                console.log(letterController.base.letters);
                done();
            }, 8000);

         */
            expect($state.current.name).toBe('loading');
            expect(letterController.base.letters).toBeDefined();


        })
    })
});

