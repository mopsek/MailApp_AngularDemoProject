describe('tests', function () {

    beforeEach(module('mailApp'));

    xdescribe('Receive data tests', function () {

        var $httpBackend,
            letterController,
            $rootScope;

        beforeEach(inject(function (_$httpBackend_, _letterController_, _mails_, _users_, _$rootScope_) {
            $httpBackend = _$httpBackend_;
            letterController = _letterController_;
            $rootScope = _$rootScope_;

            $httpBackend.whenGET('mails/users.json').respond(_users_);
            $httpBackend.whenGET('mails/mails.json').respond(_mails_);
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
                    $rootScope.$digest();
                    expect(d["inbox"]).toBeDefined();
                    expect(letterController.base.letters).toBeDefined();
                    done();
                });

            $httpBackend.flush();

        });
    });

    xdescribe('Directory Controller tests', function() {
        var letterController,
            dirController,
            $state;

        beforeEach(inject(function(_letterController_, _dirController_, _$state_) {
            letterController = _letterController_;
            dirController = _dirController_;
            $state = _$state_;
        }));

        beforeEach(function() {
            jasmine.clock().install();
        });

        afterEach(function() {
            jasmine.clock().uninstall();
        });

        it('should check init', function() {
            expect(dirController.getInit()).toBe(true);
            dirController.finishInit();
            expect(dirController.getInit()).toBe(false);
            dirController.resetInit();
            expect(dirController.getInit()).toBe(true);
        });

        xit('should return state', function() { // не работает
            expect(dirController.currentState()).toBe('');
            $state.go('mail.inbox');
            setTimeout(function() {
                expect(dirController.currentState()).toBe('inbox');
            }, 5000);
            jasmine.clock().tick(8000);

        })
    });

    xdescribe('Letter controller tests', function() {

        var letterController;

        beforeEach(inject(function(_letterController_, $rootScope, $httpBackend, mails, users){
            letterController =_letterController_;

            $httpBackend.whenGET('mails/mails.json').respond(mails);
            $httpBackend.whenGET('mails/users.json').respond(users);

            _letterController_.base.letters = mails;
        }));

        it('d', function() {
            expect(letterController.base.letters).toBeDefined();
        });
    });

    xdescribe('State tests', function() {

        var $state,
            $rootScope,
            dirController;

        beforeEach(inject(function(_$state_, _$rootScope_, _dirController_, $httpBackend, users) {
            $state = _$state_;
            $rootScope = _$rootScope_;
            dirController = _dirController_;

            $httpBackend.whenGET('mails/users.json').respond(users);
        }));

        it('?', function() {
            expect(dirController.currentState()).toBe('');
            $state.go('mail.inbox');
            $rootScope.$digest();
            console.log($state.current);
            expect(dirController.currentState()).toBe('');
        })
    });

    describe('Authorisation tests', function() {

        var checkData,
            $httpBackend,
            $rootScope,
            $state;


        beforeEach(inject(function(_checkData_, _$httpBackend_, profiles, _$rootScope_, _$state_, users) {
            checkData = _checkData_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            $state = _$state_;


        }));

        it('should sign in', function() {
            expect(checkData.getPermission()).toBe(false);
            checkData.signIn({login: 'test', password: '123'});
            //$rootScope.$digest();
            expect(checkData.getPermission()).toBe(true);
            console.log($state.current.name)

        })
    })
});

