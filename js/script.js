var key = 'be11bc1fc11463fbd25d54db69d7b0ba';
var searchButton = $('.search-button');
var weatherSearch = $('.weather-search');
var showToday = $('#today');
var showForecast = $('#forecast');
var historyStored = $('#history');

var newCity = [];

function displayForecast(results) {

    for (var day of results.list) {
        var date = moment.unix(day.dt).format("MM/DD/YYYY");
        var hour = moment.unix(day.dt).format("hh:mm:ss a");

        //Only shows results of 12pm
        if (hour == '12:00:00 pm') {

            showForecast.append(`
        <div>
        <h2>${date}</h2>
        <h3>
        <p><img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="weather icon"></p>
        <p>Temp: ${Math.round(day.main.temp)} C°</p>
        <p>Wind: ${day.wind.speed} KPH</p>
        <p>Humidity: ${day.main.humidity} %</p>
        </h3>
        </div>
        `)
        }

    }
}
;



function getForecast(latitude, longitude) {



    $.get(`https://api.openweathermap.org/data/2.5/forecast?appid=${key}&lat=${latitude}&lon=${longitude}&units=metric`)
        .then(function (data) {

            displayForecast(data);

        });



}

function displayCurrentWeather(result, searchCity) {

    //Cleans html to display new search
    showToday.html('');
    showForecast.html('');


    if (!result) {
        showToday.html('<p >No result found </p>');
        return;
    }
    else {

        var dateToday = moment.unix(result.dt).format("MM/DD/YYYY");
        showToday.append(`
            <div>
            <h1>${searchCity} (${dateToday})<img src="https://openweathermap.org/img/w/${result.weather[0].icon}.png" alt="weather icon"></h1>
            <h3>
            <p>Temp: ${Math.round(result.main.temp)} C°</p>
            <p>Wind: ${result.wind.speed} KPH</p>
            <p>Humidity: ${result.main.humidity} %</p>
            </h3>
            </div>
            `)
        getForecast(result.coord.lat, result.coord.lon);

    }

}



function storeHistory(h) {

    var existingSearch = JSON.parse(localStorage.getItem("history"));
    if (existingSearch !== null) {
        newCity = existingSearch;
    }

    //Only stores cities that are not on the local storage already
    if (!newCity.includes(h)) {
        newCity.push(h);
    }


    localStorage.setItem("history", JSON.stringify(newCity));
}





//Function to get current weather information of searched city
function getCurrentWeather(event) {
    event.preventDefault();

    //Gets class of button to know if is first time or form history
    var buttonClass = $(this).attr("class");

    //Sets city from input or button id depending the request
    //If the request is from a history button
    if (buttonClass !== 'btn search-button') { 
        var buttonId = $(this).attr("id");
        searchCity = buttonId;
    }
    //If the request is from the search button, needs to save on local storage if is not blank
    else {
        var searchCity = weatherSearch.val().trim();
        //Only calls to store a new search if is the input is not blank
        if (searchCity !== '') {
            storeHistory(searchCity);
        }

    };
    //Id the city is not blank shows the current weather
    if (searchCity) {
        $.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${key}&units=metric`)
            .then(function (data) {
                displayCurrentWeather(data, searchCity);
            });
    }

}








//Function to render history buttons coming from localStorage
function renderHistory() {

    //Get stored search from localStorage
    var existingSearch = JSON.parse(localStorage.getItem("history"));

    //Cleans html to show buttons
    historyStored.html('');

    //If there is any search stored on localStorage creates a button for each of them
    if (existingSearch) {
        for (var i = 0; i < existingSearch.length; i++) {
            var city = existingSearch[i];
            //Uses the name of the city as id for future searches
            historyStored.append(`<button class='history-button' id='${city}'>${city}</button>`);
        }
    }
    //Adds listener for each history button
    historyStored.on('click', '.history-button', getCurrentWeather);

}



//Render history buttons coming from localStorage and adds event listener for search button
function init() {
    renderHistory();
    searchButton.click(getCurrentWeather);
};

init();





