function fetchCountries() {
    return
    fetch("https://restcountries.com/v2/all")
        .then(response => response.json())
     
    }



export {fetchCountries}