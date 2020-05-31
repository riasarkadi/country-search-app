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

        fetchSpy = spyOn(countryService, 'fetch');
        selectSpy = spyOn(selectService, 'select')
    }));

    it('should fetch matching countries if length of searchword > 1', function () {
        scope.text = 'pol';
        scope.searchCountry();
        expect(countryService.fetch(scope.text)).toHaveBeenCalled();
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

    it('should select a country from list', function () {
        const isoCode = 'POL';
        scope.countries = [
            {
                name: 'Poland',
                isocode: 'POL'
            }
        ]
        scope.selectCountry(isoCode);
        expect(selectSpy).toHaveBeenCalled();
    });

});