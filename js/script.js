var key = 'be11bc1fc11463fbd25d54db69d7b0ba';
var searchButton = $('#search-button');
var weatherSearch = $('.weather-search');
var showToday = $('#today');
var showForecast = $('#forecast');
var historyStored = $('#history');
var newCity = [];


//Function to display 5 days forecast weather information of searched city
function displayForecast(results) {

    //Inserts title on html as sibling of showToday
    $(`<h4 class="mt-1 font-weight-bold">5-Day Forecast:</h4>`).insertAfter(showToday);

    //Loops array of results
    for (var day of results.list) {

        ////Creates correct format for the date and time using https://momentjs.com/
        var date = moment.unix(day.dt).format("DD/MM/YYYY");
        var hour = moment.unix(day.dt).format("hh:mm:ss a");

        //Only shows results of 12pm
        if (hour == '12:00:00 pm') {
            //Shows results on html page
            showForecast.append(`
            
                <div class="mr-3 ml-3 pr-5 pl-2 pt-2 border border-dark forecast-card">
                <h6 class='font-weight-bold'>${date}</h6>
                <h6>
                <p><img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="weather icon"></p>
                <p>Temp: ${Math.round(day.main.temp)} C°</p>
                <p>Wind: ${day.wind.speed} KPH</p>
                <p>Humidity: ${day.main.humidity} %</p>
                </h6>
                </div>
                `)
        }

    }

    
}
;

//Function to get from https://openweathermap.org/ 5 days forecast weather information of searched city
function getForecast(latitude, longitude) {
   
    $.get(`https://api.openweathermap.org/data/2.5/forecast?appid=${key}&lat=${latitude}&lon=${longitude}&units=metric`)
        .then(function (data) {
            displayForecast(data);

        });
}

//Function to display current weather information get it 
function displayCurrentWeather(result, searchCity) {

    //Cleans html to display new search
    showToday.next().html('');
    showToday.html('');
    showForecast.html('');
   
    
    //If the search was empty 
    if (!result) {
        showToday.html('<h5>No result found. Please enter a valid city name.</h5>');
        return;
    }
    else {
        
        //Creates correct format for the date using https://momentjs.com/
        var dateToday = moment.unix(result.dt).format("DD/MM/YYYY");
        //Shows result on html page
        showToday.append(`
            <div class='border border-dark pl-2'>
            <p class='font-weight-bold'>
            <h2>${searchCity} (${dateToday})<img src="https://openweathermap.org/img/w/${result.weather[0].icon}.png" alt="weather icon"></h2>
            </p>
            <h6>
            <p>Temp: ${Math.round(result.main.temp)} C°</p>
            <p>Wind: ${result.wind.speed} KPH</p>
            <p>Humidity: ${result.main.humidity} %</p>
            </h6>
            </div>
            `)
        getForecast(result.coord.lat, result.coord.lon);
    }

}


//Function to store new searches into localStorage 
function storeHistory(city) {
   
    //Gets history searches form local storage
    var existingSearch = JSON.parse(localStorage.getItem("history"));
    if (existingSearch !== null) {
        newCity = existingSearch;
    }
    //Only stores cities that are not on the local storage already
    if (!newCity.includes(city)) {
        newCity.push(city);
    }
    localStorage.setItem("history", JSON.stringify(newCity));
   
    
}


//Function to get from https://openweathermap.org/ current weather information of searched city
function getCurrentWeather(event) {
    
    event.preventDefault();

    //Gets id of button to know if is first time or form history
    var buttonClass = $(this).attr("id");

    //Sets city from input or button id depending the request
    //If the request is from a history button
    if (buttonClass !== 'search-button') { 
        var buttonId = $(this).attr("id");
        searchCity = buttonId;
        
    }
    //If the request is from the search button, needs to save on local storage if is not blank
    else {
        var searchCity = weatherSearch.val().trim();
        weatherSearch.val('');

        
    };
    //If the city is not blank call to display the current weather
    if ((searchCity) && (searchCity !== '')) {
        $.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${key}&units=metric`)
            .then(function (data) {
                  
                    
                    //Store a new search if is the input is not blank and the city exists
                    storeHistory(searchCity);
                    renderHistory();
                    displayCurrentWeather(data, searchCity);  

                   
                    
                
                }
            )
            // I
            .fail(function (){
                displayCurrentWeather(false, searchCity);      
            }
            )

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
            historyStored.append(`<button class='history-button${i} mb-2 pb-2 pt-2 btn btn-sm btn-block btn-secondary text-black-50' id='${city}'>${city}</button>`);
           
             //Adds listener for new history button
            var newButton = $(`.history-button${i}`);
            newButton.click(getCurrentWeather);
        }
    }
   

}



//Render history buttons coming from localStorage and adds event listener for search button
function init() {
   
    renderHistory();
    searchButton.click(getCurrentWeather);
};

init();







