angular.
    module('countrySearch').
    component('appComponent', {
        templateUrl: 'components/app.component.html',
        controller: AppController
    });

AppController.$inject = ['countryService', 'selectService'];

function AppController(countryService, selectService) {
    this.selectedCountries = selectService.countries;

    this.removeItem = function (code) {
        selectService.remove(code);
    }

    this.submitHandler = function () {
        const isoCodes = selectService.isoCodes();

        countryService.post(isoCodes);
        selectService.clear();
    }
}