angular.
    module('countrySearch').
    component('searchbar', {
        templateUrl: 'components/searchbar.component.html',
        controller: SearchbarController
    }
);

SearchbarController.$inject = ['$scope', '$log', '$http'];

function SearchbarController($scope, $log, $http) {    
    const fetchCountries = (param) => {
        $http.get('/mocks/countryData.json')
            .then((res) => {
                const filteredData = res.data.filter(c => c.name.toLowerCase().includes(param));
                $log.log(filteredData);
                this.countries = filteredData;
            }).catch((err) => {
                $log.log(err);
            })
    }

    this.keyUpHandler = function($event) {
        if (this.country.length > 1) {
            fetchCountries(this.country);
        } else {
            this.countries = [];
        }
    }
    
}