app.factory('selectService', SelectService);

SelectService.$inject = [];

function SelectService() {
    let selected = [];

    const select = (country) => {
        if (selected.length > 0) {
            const countrySelected = selected.filter(c => c.isoCode === country.isoCode);

            if (countrySelected.length === 0) {
                selected.push(country);
            };
        } else {
            selected.push(country);
        }
    }

    const remove = (isoCode) => {
        for (let i = 0; i < selected.length; i++) {
            if (selected[i].isoCode === isoCode) {
                selected.splice(i, 1);
            }
        }
    }

    const clear = () => selected.splice(0, selected.length);

    const isoCodes = () => selected.map(c => c.isoCode);

    return {
        select: select,
        remove: remove,
        clear: clear,
        countries: selected,
        isoCodes: isoCodes
    }
}