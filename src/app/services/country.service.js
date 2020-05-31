app.factory('countryService', CountryService);

CountryService.$inject = ['$log', '$http'];

function CountryService($log, $http) {

    const fetchCountries = (param) => {
        return $http.get(`http://localhost:8080/countries?search=${param}`)
            .then((res) => {
                return res.data;
            }, function (res) {
                console.log(res.data);
                return res.data;
            });
    }

    const postCountries = (data) => {
        return $http({
            method: "POST",
            url: 'http://localhost:8080/selectedCountries',
            data: data
        }).then(function (res) {
            $log.log(res.data);
            return 'Success!';
        }, function (res) {
            return 'Failure';
        });
    }

    return {
        fetch: fetchCountries,
        post: postCountries,
    }
}