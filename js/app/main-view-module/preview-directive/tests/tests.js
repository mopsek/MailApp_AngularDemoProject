describe('preview directive tests', function() {

    beforeEach(module('mailApp'));

    var element,
        element2,
        $scope,
        scope,
        stateService,
        authorizationService,
        letterService,
        $httpBackend,
        $rootScope,
        $timeout,
        $compile,
        controller,
        $stateParams;

    beforeEach(inject(function(_authorizationService_, _$httpBackend_, _$rootScope_, _$compile_, users, mails,
                               _$timeout_, _stateService_, _letterService_, _$stateParams_) {
        authorizationService = _authorizationService_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        stateService = _stateService_;
        letterService = _letterService_;
        $compile = _$compile_;
        $stateParams = _$stateParams_;

        $httpBackend.whenGET('data/JSON/users.json').respond(users);
        $httpBackend.whenGET('data/JSON/mails.json').respond(mails);
        $httpBackend.whenGET(/\.html$/).respond(200, '');
    }));

    it('check selected letter', function(done) {
        authorizationService.signIn({login: "test", password: "123"})
            .then(() => {
                expect(stateService.currentState()).toBe('inbox');
                setTimeout(() => {
                    stateService.setActiveState('preview', {dir: 'filtered', index: 0});
                    $rootScope.$digest();
                    element = angular.element('<preview></preview>');
                    $scope = $rootScope.$new();
                    $compile(element)($scope);
                    scope = element.isolateScope();
                    controller = scope.preview;
                    expect(letterService.selected.letter.directory).toBe('inbox');

                    done();
                })

            });

        $timeout.flush();
        $httpBackend.flush();
    });

});