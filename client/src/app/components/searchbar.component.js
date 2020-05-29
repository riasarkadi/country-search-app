angular.
    module('countrySearch').
    component('searchbar', {
        templateUrl: 'components/searchbar.component.html',
        controller: SearchbarController
    }
);

SearchbarController.$inject = ['$scope', '$log', '$http', 'countryService', '$rootScope'];

function SearchbarController($scope, $log, $http, countryService, $rootScope) {    
    /* const fetchCountries = (param) => {
        $http.get('/mocks/countryData.json')
            .then((res) => {
                const filteredData = res.data.filter(c => c.name.toLowerCase().includes(param));
                $log.log(filteredData);
                this.countries = filteredData;
            }).catch((err) => {
                $log.log(err);
            })
    } */

    this.clickHandler = function(code) {
        console.log(code);
        this.selected = this.countries.filter(c => c.isoCode === code)[0];
        console.log(this.selected);
        $rootScope.$emit("select", this.selected);
    }

    this.keyUpHandler = function($event) {
        if (this.country.length > 1) {
            countryService.getCountries(this.country);
            this.countries = countryService.countryData;
        }
    }
    
}