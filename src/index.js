import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix'

const inputRef = document.querySelector('input#search-box')
const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')

const DEBOUNCE_DELAY = 1000;

inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))


function onInput() {
    const inputName = inputRef.value.trim()
    if (inputName === '') {
       return (countryList.innerHTML = ''), (countryInfo.innerHTML = '')
    }

    console.log(inputName)
    fetchCountries(inputName)
        .then(countries => {
            console.log(countries)
            return countries
        })
        .then(countries => {
            if (countries.length === 1) {
                return renderCountryCard(countries)         
            } else if (countries.length >= 2 || countries.length <= 10) {
                return renderCountryList(countries)
            } else {
            return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
            }
        
        })
    

   
            
            
    
    
        }
        
        
    
    

function renderCountryCard(countries) {
    const markupCountryCard = countries.map((country) =>
        `<div>
        <h1>${country.name.official}</h1>
        <img src = "${country.flags.svg}" alt="Flag" width = 200></img>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population}</p>
        <p>languages: ${Object.values(country.languages)}</p>
        </div>`)
    .join("")
    countryInfo.insertAdjacentHTML('beforeend', markupCountryCard)
}

function renderCountryList(countries) {
    const markupCountryList = countries.map((country) =>
        `<li>
        <img src = "${country.flags.svg}" alt="Flag" width = 100></img>
        <h1>${country.name.official}</h1>
        </li>
        `
    )
        .join()
    countryList.insertAdjacentHTML('beforeend', markupCountryList)
}



