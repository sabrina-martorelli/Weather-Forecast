
var searchButton = $('.search-button');
var weatherSearch = $('.weather-search');
var key ='be11bc1fc11463fbd25d54db69d7b0ba';


//Function to get Forecast information of searched city
function getForecast(event) {

    var searchCity = weatherSearch.val().trim();

    if (searchCity) {
        
      $.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${key}&units=metric`)
      .then(function (data) {
          //displayMatches(data.Search);
          console.log('inside fucntion');
          console.log(data);
        });
  
  
  
    }
  }



//Event listener for search button
function init() {
 
    searchButton.on('click', getForecast);

  }
  
  init();


  