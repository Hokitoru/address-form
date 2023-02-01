const cityResults = document.querySelector('.city-results');
const inputCity = document.querySelector('.input-city');
const checkEmail = document.querySelector('.check-email');
const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]+$/;
const checkBtn = document.querySelector('.check-btn');
const country = document.querySelector(".country");
const region = document.querySelector(".region");
const federal = document.querySelector(".federal");

const renderCities = (result) => {
    cityResults.innerHTML = "";
    for(const value of result){
        const city = value.address.city || value.address.town || value.address.municipality || value.address.village;
        if(city){
            const str = createCityTemplate(city);
            const elem = createElementFromHTML(str);
            cityResults.append(elem);
            elem.addEventListener('click', () => {
                getInfo(value);
            })
        }
    }
}

 const findAddress = async (url) => {
    const response = await fetch(url);
    const result = await response.json();
    renderCities(result.filter(item => item.type === 'city'));
}

inputCity.addEventListener('input', () => {
    const value = inputCity.value;
    const url = `https://nominatim.openstreetmap.org/search?city=${value}&format=json&accept-language=ru&county=ru&addressdetails=1`
    findAddress(url);
})

const getInfo = (value) => {
    inputCity.value = value.address.city || value.address.town || value.address.municipality || value.address.village;
    country.value = value.address.country;
    federal.value = value.address.region;
    region.value = value.address.state;
    cityResults.innerHTML = "";
}

checkBtn.addEventListener('click', () => {
    checkEmail.innerHTML = '';
    const email = document.querySelector('.email').value;
    let str;
    if(email.match(pattern)){
        str = successfulCheckEmailTemplate('Почта введена верно');
    }else{
        str = failureCheckEmailTemplate('Неправильная почта');
    }

    const elem = createElementFromHTML(str);
    checkEmail.append(elem);
})

const successfulCheckEmailTemplate = (answer) => `
<p class="successful-check">${answer}</p>
`

const failureCheckEmailTemplate = (answer) => `
<p class="failure-check">${answer}</p>
`

const createCityTemplate = (city) => `
<p class="city">${city}</p>
`
const createElementFromHTML = htmlString => {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
};