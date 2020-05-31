app.
    controller('CountryListController', CountryListController).
    component('countryList', {
        templateUrl: 'components/country-list.component.html',
        controller: CountryListController
    });

CountryListController.$inject = ['$scope', 'countryService', 'selectService'];

function CountryListController($scope, countryService, selectService) {
    $scope.selectedCountries = selectService.countries;
    $scope.submitMessage = '';

    $scope.removeCountry = function (code) {
        selectService.remove(code);
    }

    $scope.submitCountries = function () {
        const isoCodes = { isoCodes: selectService.isoCodes() };

        countryService.post(isoCodes).then((res) => $scope.submitMessage = res);
        selectService.clear();
    }
}
