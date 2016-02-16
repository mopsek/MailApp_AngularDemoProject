describe('tests', function () {

    beforeEach(module('mailApp'));

    describe('Directory Controller test', function () {

        var $httpBackend,
            letterController,
            $http,
            ddd = {
                lo: 89
            };

        beforeEach(inject(function (_$http_, _$httpBackend_, _letterController_, _mails_, _users_) {
            $httpBackend = _$httpBackend_;
            letterController = _letterController_;
            $http = _$http_;

            $httpBackend.whenGET('mails/users.json').respond(_users_);
            $httpBackend.whenGET('mails/mails.json').respond(_mails_);
            $httpBackend.whenGET('try.json').respond(_users_);

            jasmine.clock().install();
        }));

        it('///', function(done) {


            letterController.test().
                then(function(d) {
                    jasmine.clock().tick(2000)
                    expect(letterController.testV).toBeDefined();
                    done();
                });

            $httpBackend.flush();
        });

        xit('should load users', function(done) {
            //expect(letterController.base.users).not.toBeDefined();

            letterController.getUsers().
                then(function () {
                    expect(letterController.base.users).toBeDefined();
                    done()
                });

            $httpBackend.flush();
        });

        xit('should load letters', function (done) {
            expect(letterController.base.letters).not.toBeDefined();

            letterController.init().then(function() {
                expect(letterController.base.letters).toBeDefined();
                done();
            });

            $httpBackend.flush();
        });


    });
});

