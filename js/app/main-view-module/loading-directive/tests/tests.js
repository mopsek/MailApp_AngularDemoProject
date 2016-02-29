describe('loading-directive tests', function() {

    beforeEach(module('mailApp'));

    var element,
        $rootScope,
        $scope,
        scope,
        $compile,
        controller,
        animationService,
        $state,
        initializationService;

    beforeEach(inject(function(_$rootScope_, _$compile_, _animationService_, _$state_, _initializationService_) {
        $rootScope = _$rootScope_;
        $compile = _$compile_;
        animationService = _animationService_;
        $state = _$state_;
        initializationService = _initializationService_;
    }));

    it('should add animation and change state', function() {
        spyOn(animationService, 'loading');
        spyOn($state, 'go');
        initializationService.finishInit();

        element = angular.element('<loading></loading>');
        $scope = $rootScope.$new();
        $compile(element)($scope);

        expect(animationService.loading).toHaveBeenCalled();
        expect($state.go).toHaveBeenCalled();
    });
});