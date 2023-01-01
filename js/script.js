
var searchButton = document.querySelector('.search-button');

var weatherSearch = document.querySelector('.weather-search');

var key ='be11bc1fc11463fbd25d54db69d7b0ba';


//Function to get Forecast information of searched city
function getForecast(event) {

    var searchCity = weatherSearch.val().trim();

    if (searchCity) {
        
      $.get(`https://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&appid=${key}&units=metric`)
      .then(function (data) {
          //displayMatches(data.Search);
          console.log(data);
        });
  
  
  
    }
  }



//Event listener for search button
function init() {
 
    searchButton.on('click', getForecast);

  }
  
  init();


  