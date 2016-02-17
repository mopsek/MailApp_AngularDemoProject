describe('tests', function () {

    beforeEach(module('mailApp'));

    describe('Letter Controller tests', function () {

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
    })
});

