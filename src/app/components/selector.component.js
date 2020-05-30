app.component('selector', {
    templateUrl: 'components/selector.component.html',
    controller: SelectorController
});

SelectorController.$inject = ['countryService', 'selectService'];

function SelectorController(countryService, selectService) {
    this.selectedCountries = selectService.countries;
    this.submitMessage = '';

    this.removeItem = function (code) {
        selectService.remove(code);
    }

    this.submitHandler = function () {
        const isoCodes = { isoCodes: selectService.isoCodes() };

        countryService.post(isoCodes).then((res) => this.submitMessage = (res === 200) ? 'Success!' : 'Failure!');
        selectService.clear();
    }
}
