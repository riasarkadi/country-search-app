app.factory('countryService', CountryService);

CountryService.$inject = ['$log', '$http'];

function CountryService($log, $http) {

    const fetchCountries = (param) => {
        return $http.get(`http://localhost:8080/countries?search=${param}`)
            .then((res) => {
                return res.data;
            }, function (res) {
                if (res.status === 404) {
                    console.log('No such country!');
                } else {
                    console.log(res.status);
                }
            });
    }

    const postCountries = (data) => {
        return $http({
            method: "POST",
            url: 'http://localhost:8080/selectedCountries',
            data: data
        }).then(function (res) {
            $log.log(res.data);
            return res.status;
        }, function (res) {
            return res.status;
        });
    }

    return {
        fetch: fetchCountries,
        post: postCountries,
    }
}