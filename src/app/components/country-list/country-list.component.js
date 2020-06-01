app.
    controller('CountryListController', CountryListController).
    component('countryList', {
        templateUrl: 'components/country-list/country-list.component.html',
        controller: CountryListController
    });

CountryListController.$inject = ['$scope', 'countryService', 'selectService'];

function CountryListController($scope, countryService, selectService) {
    $scope.selectedCountries = selectService.countries;
    $scope.countryListMessage = 'No country selected yet';
    $scope.selectService = selectService;

    $scope.removeCountry = function (code) {
        selectService.remove(code);
    }

    $scope.submitCountries = function () {
        const isoCodes = { isoCodes: selectService.isoCodes() };

        countryService.post(isoCodes).then((res) => {
            if (res === 'Success!') {
                $scope.countryListMessage = 'Select new countries.';
                selectService.clear();
                selectService.input = '';
            }
            selectService.response = res;
        });
    }
}
