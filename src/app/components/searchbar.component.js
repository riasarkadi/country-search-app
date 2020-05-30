app.component('searchbar', {
    templateUrl: 'components/searchbar.component.html',
    controller: SearchbarController
});

SearchbarController.$inject = ['countryService', 'selectService'];

function SearchbarController(countryService, selectService) {
    this.test = 'test';

    this.clickHandler = function (code) {
        const country = this.countries.filter(c => c.isoCode === code)[0];
        selectService.select(country);
    }

    this.keyUpHandler = function () {
        if (this.text.length > 1) {
            countryService.fetch(this.text).then((data) => {
                this.countries = data;
            });
        } else {
            this.countries = [];
        }
    }

    this.blurHandler = function () {
        this.countries = [];
        console.log('blurs');
    }

}