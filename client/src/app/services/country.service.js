angular.
    module('countrySearch').
    factory('countryService', CountryService);

CountryService.$inject = ['$log', '$http'];

function CountryService($log, $http) {
    let countryData = [];

    const fetchCountries = (param) => {
        reset();
        $http.get(`http://localhost:8080/countries?search=${param}`)
            .then((res) => {
                countryData.push(...res.data);
            }).catch((err) => {
                $log.log(err);
            })
    }

    const postCountries = (data) => {
        console.log(data);
        const postData = { isoCodes: data };
        $http({
            method: "POST",
            url: 'http://localhost:8080/selectedCountries',
            data: postData
        }).then(function (res) {
            console.log(res)
        }, function (res) {
            console.log(res)
        });
    }

    const reset = () => countryData.splice(0, countryData.length)

    return {
        fetch: fetchCountries,
        post: postCountries,
        reset: reset,
        countryData: countryData
    }
}