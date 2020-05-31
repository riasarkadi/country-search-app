describe('SearchbarController', function () {

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
        SearchbarController = $controller('SearchbarController', {
            '$scope': scope,
            'countryService': countryService,
            'selectService': selectService
        });
    }));

    it('should call fetch when length of searchword > 1', function () {
        const response = [
            {
                name: 'Poland',
                isocode: 'POL'
            }
        ];
        scope.text = 'pol';
        const fetchSpy = spyOn(countryService, 'fetch').and.returnValue(Promise.resolve(response));
        scope.searchCountry(scope.text);

        expect(fetchSpy).toHaveBeenCalled();
    });

    it('should fetch matching countries if length of searchword > 1', function () {
        const response = [
            {
                name: 'Poland',
                isocode: 'POL'
            }
        ];
        const text = 'pol';
        spyOn(countryService, 'fetch').and.returnValue(Promise.resolve(response));

        countryService.fetch(text)
            .then((result) => {
                expect(countryService.post).toHaveBeenCalledWith(isoCodes);
                expect(result).toEqual(response);
                expect(scope.countries).toBe(response);
                done();
            });
    });

    it('should return error data on fetch failure', function () {
        const response = '404 Not found';
        const text = 'pol';
        spyOn(countryService, 'fetch').and.returnValue(Promise.reject(response));

        countryService.fetch(text)
            .then((result) => {
                expect(countryService.post).toHaveBeenCalledWith(isoCodes);
                expect(result).toEqual(response);
                expect(scope.countries).toBe([]);
                done();
            });
    });

    it('should clear countries array when no match or searchword length < 1', function () {
        scope.text = '';
        scope.countries = [
            {
                name: 'Poland',
                isocode: 'POL'
            }
        ];
        scope.searchCountry();
        expect(scope.countries).toEqual([]);
    });

    it('should call selectService.select() when selecting country', function () {
        const isoCode = 'POL';
        scope.countries = [
            {
                name: 'Poland',
                isocode: 'POL'
            }
        ]
        selectSpy = spyOn(selectService, 'select');
        scope.selectCountry(isoCode);

        expect(selectSpy).toHaveBeenCalled();
    });

});