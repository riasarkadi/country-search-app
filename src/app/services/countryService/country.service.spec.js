describe('countryService', function () {

    beforeEach(module('countrySearch'));

    let countryService;
    let httpBackend;

    beforeEach(inject(function (_countryService_, _$httpBackend_) {
        httpBackend = _$httpBackend_;
        countryService = _countryService_;
    }));

    describe('fetch', function () {
        it('should fetch countries from api', function () {
            const param = 'pol';
            let res = null;
            const response = {
                data: [
                    {
                        name: 'Poland',
                        isocode: 'POL'
                    }
                ]
            };
            httpBackend.whenGET(`http://localhost:8080/countries?search=${param}`).respond(response);
            countryService.fetch(param).then(function (response) {
                res = response.data;
            })
            httpBackend.flush();
            expect(res[0].name).toBe('Poland');
        })
        it('should throw error when no countries matched', function () {
            const param = '000';
            let res = null;
            const response = { data: '404 Not Found' };
            httpBackend.whenGET(`http://localhost:8080/countries?search=${param}`).respond(response);
            countryService.fetch(param).then(function (response) {
                res = response.data;
            })
            httpBackend.flush();
            expect(res).toBe('404 Not Found');
        })
    })
    describe('post', function () {
        it('should post isoCodes to backend', function () {
            let res = null;
            const data = { isoCodes: ['POL'] };
            const response = 'Success!';
            httpBackend.whenPOST(`http://localhost:8080/selectedCountries`, data).respond(response);
            countryService.post(data).then(function (response) {
                res = response;
            })
            httpBackend.flush();
            expect(res).toBe('Success!');
        })
    })
})