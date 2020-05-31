app.
    controller('SearchbarController', SearchbarController).
    component('searchbar', {
        templateUrl: 'components/searchbar.component.html',
        controller: SearchbarController
    });

SearchbarController.$inject = ['$scope', 'countryService', 'selectService'];

function SearchbarController($scope, countryService, selectService) {

    $scope.searchCountry = function () {
        if ($scope.text.length > 1) {
            countryService.fetch($scope.text).then((data) => {
                $scope.countries = data;
            });
        } else {
            $scope.countries = [];
        }
    }

    $scope.selectCountry = function (code) {
        const country = $scope.countries.filter(c => c.isoCode === code)[0];
        selectService.select(country);
    }

    $scope.blurHandler = function () {
        $scope.countries = [];
    }

}