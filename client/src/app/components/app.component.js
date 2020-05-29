angular.
    module('countrySearch').
    component('appComponent', {
        templateUrl: 'components/app.component.html',
        controller: AppController
    }
);

AppController.$inject = ['$scope', '$rootScope'];

function AppController($scope, $rootScope) {
    this.selectedCountries = [];

    this.removeItem = function(code) {
        this.selectedCountries = this.selectedCountries.filter(c => !(c.isoCode === code));
    }

    this.submitHandler = function() {
        const isoCodes = this.selectedCountries.map(c => {
            return c.isoCode;
        })

        console.log(isoCodes);
    }

    $rootScope.$on("select", (event, data) => {
        this.selectedCountries.push(data);
    })
}