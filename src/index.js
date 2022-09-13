import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio'

const inputRef = document.querySelector('input#search-box')
const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')

const DEBOUNCE_DELAY = 1000;

inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))


function onInput() {
    const inputName = inputRef.value.trim()
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    
    console.log(inputName)
    fetchCountries(inputName)
        .then(countries => {
            console.log(countries)
            return countries
        })
        .then(countries => {
            if (countries.length === 1) {
                return renderCountryCard(countries)
            } else if (countries.length >= 2 && countries.length <= 10) {
                return renderCountryList(countries)
            } else if (countries.length > 10) {
            Notify.info('Too many matches found. Please enter a more specific name.')
            } else if (response.status === 404) {
                return error
            }
        })    
        .catch(error => Notify.failure('Oops, there is no country with that name'))
}
        

function renderCountryCard(countries) {
    const markupCountryCard = countries.map((country) =>
        `<h1 class="country-info-title">${country.name.official}</h1>
        <img src = "${country.flags.svg}" alt="Flag" width = 150></img>
        <p class="country-info-paragraph">Capital: <span class="country-info-text">${country.capital}</span></p>
        <p class="country-info-paragraph">Population: <span class="country-info-text">${country.population}</span></p>
        <p class="country-info-paragraph">languages: <span class="country-info-text">${Object.values(country.languages)}</span></p>`)
    .join("")
    countryInfo.insertAdjacentHTML('beforeend', markupCountryCard)
}

function renderCountryList(countries) {
    const markupCountryList = countries.map((country) =>
        `<li class="country-item">
        <img class="country-item-img" src = "${country.flags.svg}" alt="Flag" width = 100></img>
        <h1 class="country-item-title">${country.name.official}</h1>
        </li>`
    )
        .join("")
    countryList.insertAdjacentHTML('beforeend', markupCountryList)
}


Notify.init({
width: '560px',
position: 'right-top',
fontSize: '20px',
})

