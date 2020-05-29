angular.
    module('countrySearch').
    factory('countryService', CountryService);

CountryService.$inject = ['$log', '$http'];

function CountryService($log, $http) {
    let countryData = [];
    const getCountries = (param) => {
        $http.get('/mocks/countryData.json')
            .then((res) => {
                const filteredData = res.data.filter(c => c.name.toLowerCase().includes(param));
                countryData.push(...filteredData);
            }).catch((err) => {
                $log.log(err);
            })
    }
    
    const resetCountryData = () => {
        countryData = [];
    }

    return {
        getCountries: (param) => getCountries(param),
        countryData: countryData
    }
}