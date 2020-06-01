describe('selectService', function () {

    beforeEach(module('countrySearch'));

    let $controller;
    let scope;
    let selectService;

    beforeEach(inject(function ($rootScope, _$controller_, _selectService_) {
        scope = $rootScope.$new();
        selectService = _selectService_;
        $controller = _$controller_;
        SearchbarController = $controller('SearchbarController', {
            '$scope': scope,
            'selectService': selectService
        });
    }));

    describe('select()', function () {
        it('should select a country and push to selected list', function () {
            const selected = selectService.countries;
            const country = { name: 'Poland', isoCode: 'POL' };
            selectService.select(country);

            expect(selected[0].name).toBe('Poland');
        })
        it('should not push to selected list if country already exists', function () {
            const selected = selectService.countries;
            const country = { name: 'Poland', isoCode: 'POL' };
            selectService.select(country);
            selectService.select(country);

            expect(selected[0].name).toBe('Poland');
            expect(selected[1]).toBe(undefined);
        })
    })

    describe('remove()', function () {
        it('should remove a country from selected list', function () {
            const selected = selectService.countries;
            const isoCode = 'POL';
            const country = { name: 'Poland', isoCode: 'POL' };
            selectService.select(country);
            selectService.remove(isoCode);

            expect(selected).toEqual([]);
        })
    })

    describe('clear()', function () {
        it('should clear all couuntries from selected list', function () {
            const selected = selectService.countries;
            const country = { name: 'Poland', isoCode: 'POL' };

            selectService.select(country);
            selectService.clear();

            expect(selected).toEqual([]);
        })
    })

    describe('isoCodes()', function () {
        it('should filter isoCodes of selected countries', function () {
            let isoCodes = [];
            const country = { name: 'Poland', isoCode: 'POL' };
            selectService.select(country);
            isoCodes = selectService.isoCodes();

            expect(isoCodes[0]).toBe('POL');
        })
    })
})