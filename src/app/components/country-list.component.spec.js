describe('CountryListController', function () {

    beforeEach(module('countrySearch'));

    let $controller;
    let scope;
    let countryService;
    let selectService;

    beforeEach(inject(function ($rootScope, _$controller_, _countryService_, _selectService_) {
        scope = $rootScope.$new();
        countryService = _countryService_;
        selectService = _selectService_;
        $controller = _$controller_;
        CountryListController = $controller('CountryListController', {
            '$scope': scope,
            'countryService': countryService,
            'selectService': selectService
        });
    }));

    /* it('should set selected countries', function () {
        expect(scope.selectedCountries)
    }); */

    it('should call selectService.remove() when removeCountry() is called with arg', function () {
        const arg = 'POL';
        const removeSpy = spyOn(selectService, 'remove').and.callThrough();
        scope.removeCountry(arg);
        expect(removeSpy).toHaveBeenCalledWith(arg);
    });

    it('should clear selected items after submit', function () {
        const isoCodes = { isoCodes: ['POL', 'HUN'] };
        const clearSpy = spyOn(selectService, 'clear');
        scope.submitCountries(isoCodes);
        expect(clearSpy).toHaveBeenCalled();
    });

});