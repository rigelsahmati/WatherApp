var latitude
var longitude
var city
var searchBtn = document.querySelector('.search')
var conditionImg = document.querySelector('.condition-img')
var userCity = document.getElementById('city')
var notFound = document.querySelector('.not-found')
var wind = document.getElementById('wind')
var temp = document.getElementById('temp')
var conditionText = document.querySelector('.condition-text')
var spiningSvg = document.getElementById('spiningSvg')


searchBtn.addEventListener('click', () => {
    spiningSvg.style.opacity = 1;
    spiningSvg.style.visibility = "visible";
    city = document.querySelector('.input-box').value
    if (city != '') {
    get_lat_lon(city)
    notFound.hidden = true
    document.querySelector('.wather-condition').classList.add('wather-condition-active')
    document.querySelector('.wather-box').classList.add('wather-box-active')
    }
})

async function get_Wather() {
    var wather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${parseInt(latitude)}&longitude=${parseInt(longitude)}&hourly=temperature_2m,relativehumidity_2m,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min&current_weather=true&forecast_days=1&timezone=auto`)
    var watherData = await wather.json();
    wind.innerText = watherData.current_weather.windspeed
    temp.innerText = watherData.current_weather.temperature
    var watherCode  = parseInt(watherData.current_weather.weathercode)
    if (watherCode == 0 ) {
        conditionImg.style.backgroundImage = "url('css/images/suny.png')";
        conditionText.innerText = 'Clear Sky'
    }
    else if (watherCode == 1 || 2 || 3 ) {
        conditionImg.style.backgroundImage = "url('css/images/suny-clouds.png')";
        conditionText.innerText = 'Partly Cloudy'
    }
    else if (watherCode == 45 || 48 ) {
        conditionImg.style.backgroundImage = "url('css/images/cloud.png')";
        conditionText.innerText = 'Fog'
    }
    else if (watherCode == 61 || 63 || 65 ) {
        conditionImg.style.backgroundImage = "url('css/images/rain.png')";
        conditionText.innerText = 'Rain'
    }
    else if (watherCode == 71 || 73 || 75 ) {
        conditionImg.style.backgroundImage = "url('css/images/snow.png')";
        conditionText.innerText = 'Snow fall'
    }
    else if (watherCode == 96 || 99 ) {
        conditionImg.style.backgroundImage = "url('css/images/thunderstorm.png')";
        conditionText.innerText = 'Thunderstorm'
    }
    spiningSvg.style.opacity = 0;
    spiningSvg.style.visibility = "hidden";
}


async function get_lat_lon() {
    const geo_options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1775f02852msh84aa1dc96c06841p11576djsn2d4858821ba5',
            'X-RapidAPI-Host': 'forward-reverse-geocoding.p.rapidapi.com'
        }
    };
    var geoApiRes = await fetch(`https://forward-reverse-geocoding.p.rapidapi.com/v1/forward?city=${city}&accept-language=en&limit=1&polygon_threshold=0.0`, geo_options)
    var geoApiData = await geoApiRes.json();

    if (geoApiData.length != 1) {
        notFound.hidden = false
        spiningSvg.style.opacity = 0;
    spiningSvg.style.visibility = "hidden";
        conditionImg.style.backgroundImage = "url('css/images/not-found.png')";
        notFound.classList.add('not-found-active')
        document.querySelector('.info').classList.add('hidden')
        document.querySelector('.wather-info ').classList.add('hidden')
        
    }
    else {
        latitude = geoApiData[0].lat
        longitude = geoApiData[0].lon
        get_Wather(latitude, longitude)
        notFound.classList.remove('not-found-active')
        document.querySelector('.info').classList.remove('hidden')
        document.querySelector('.wather-info ').classList.remove('hidden')
        userCity.innerText = city.toUpperCase();
    }


}


    //9f779432a8mshac0e322875fea12p1e7f1bjsnf9453aa627a2
