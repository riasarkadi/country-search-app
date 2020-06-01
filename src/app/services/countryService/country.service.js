app.factory('countryService', CountryService);

CountryService.$inject = ['$log', '$http'];

function CountryService($log, $http) {
    const urlBase = 'http://localhost:8080';

    const fetchCountries = (param) => {
        return $http.get(`${urlBase}/countries?search=${param}`)
            .then((res) => {
                return res.data;
            }, function (res) {
                return [];
            });
    }

    const postCountries = (data) => {
        return $http({
            method: "POST",
            url: `${urlBase}/selectedCountries`,
            data: data
        }).then(function (res) {
            $log.log(res.data);
            return 'Success!';
        }, function (res) {
            return 'Failure!';
        });
    }

    return {
        fetch: fetchCountries,
        post: postCountries,
    }
}