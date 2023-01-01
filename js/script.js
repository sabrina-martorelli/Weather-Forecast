var key ='be11bc1fc11463fbd25d54db69d7b0ba';
var searchButton = $('.search-button');
var weatherSearch = $('.weather-search');
var showToday = $('#today');
var showForecast = $('#forecast');

function displayForecast(results){

    console.log(results);



    for (var day of results.list) {
        //console.log(day);
        //console.log(day.dt_text);
        showForecast.append(`
        <div>
        <h1><img src="https://openweathermap.org/img/w/${day.weather[0].icon}.png" alt="weather icon"></h1>
        <h3>
        <p>${day.dt}</p>
        <p>Temp: ${Math.round(day.main.temp)} C°</p>
        <p>Wind: ${day.wind.speed} KPH</p>
        <p>Humidity: ${day.main.humidity} %</p>
        </h3>
        </div>
        `)


    
    }
}
;



function getForecast(latitude, longitude){

console.log(latitude,longitude);

    $.get(`https://api.openweathermap.org/data/2.5/forecast?appid=${key}&lat=${latitude}&lon=${longitude}&units=metric`)
    .then(function (data) {
      
     displayForecast(data);
       
     });
     


}

function displayCurrentWeather(result, searchCity){
        console.log(result);
        //Cleans html to display new search
        showToday.html('');
        showForecast.html('');


        if (!result) {
            showToday.html('<p >No result found </p>'); 
            return;
         }
         else{
            showToday.append(`
            <div>
            <h1>${searchCity} (${result.dt})<img src="https://openweathermap.org/img/w/${result.weather[0].icon}.png" alt="weather icon"></h1>
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




//Function to get Forecast information of searched city
function getCurrentWeather(event) {

    event.preventDefault();

    var searchCity = weatherSearch.val().trim();
    console.log(searchCity);

    if (searchCity) {
        
      $.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${key}&units=metric`)
      .then(function (data) {
        
       displayCurrentWeather(data, searchCity);
         
       });
       
  
  }

  }





//Event listener for search button

function init() {
    searchButton.click(getCurrentWeather);
   
  };
  
  init();


    
  
  
