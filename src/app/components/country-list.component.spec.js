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

    it('should call selectService.remove() when removing a country', function () {
        const arg = 'POL';
        const removeSpy = spyOn(selectService, 'remove');
        scope.removeCountry(arg);
        expect(removeSpy).toHaveBeenCalledWith(arg);
    });

    it('should call countryService.post() on submit', function () {
        const isoCodes = { isoCodes: ['POL', 'HUN'] };
        const response = 'Success!';
        const postSpy = spyOn(countryService, 'post').and.returnValue(Promise.resolve(response));
        scope.submitCountries(isoCodes);
        expect(postSpy).toHaveBeenCalled();
    });

    it('should set submitMessage to response value "Success!" on post success', function () {
        const isoCodes = { isoCodes: ['POL', 'HUN'] };
        const response = 'Success!';
        spyOn(countryService, 'post').and.returnValue(Promise.resolve(response));

        countryService.post(isoCodes)
            .then((result) => {
                expect(countryService.post).toHaveBeenCalledWith(isoCodes);
                expect(result).toEqual(response);
                expect(scope.submitMessage).toBe(response);
                done();
            });
    });

    it('should set submitMessage to response value "Failure!" on post reject', function () {
        const isoCodes = { isoCodes: ['POL', 'HUN'] };
        spyOn(countryService, 'post').and.returnValue(Promise.reject('Failure!'));
        countryService.post(isoCodes)
            .then((result) => {
                expect(countryService.post).toHaveBeenCalledWith(isoCodes);
                expect(result).toEqual(response);
                expect(scope.submitMessage).toBe(response);
                done();
            });
    });

    it('should clear selected items after submit', function () {
        const isoCodes = { isoCodes: ['POL', 'HUN'] };
        const clearSpy = spyOn(selectService, 'clear');
        scope.submitCountries(isoCodes);
        expect(clearSpy).toHaveBeenCalled();
    });

});