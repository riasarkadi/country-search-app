app.
    controller('SearchbarController', SearchbarController).
    component('searchbar', {
        templateUrl: 'components/searchbar/searchbar.component.html',
        controller: SearchbarController
    });

SearchbarController.$inject = ['$scope', 'countryService', 'selectService'];

function SearchbarController($scope, countryService, selectService) {
    $scope.countries = [];
    $scope.active = false;
    $scope.text = '';

    $scope.searchCountry = function () {
        if ($scope.text.length > 1) {
            countryService.fetch($scope.text).then((data) => {
                if (data.length > 0) {
                    $scope.countries = data;
                    $scope.active = true;
                }
            });
        } else {
            $scope.disactivate();
        }
    }

    $scope.selectCountry = function (code) {
        const country = $scope.countries.filter(c => c.isoCode === code)[0];
        selectService.select(country);
    }

    $scope.disactivate = function () {
        $scope.countries = [];
        $scope.active = false;
    }
}