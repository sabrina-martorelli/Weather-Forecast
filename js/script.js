
var searchButton = document.querySelector('.search-button');

var weatherSearch = document.querySelector('.weather-search')


function getForecast(event) {

    var searchCity = weatherSearch.val().trim();

    if (searchCity) {
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}&units=metric`

      $.get(`https://www.omdbapi.com/?apikey=20dc4c7f&s=${searchText}`)
      .then(function (data) {
          displayMatches(data.Search);
        });
  
  
  
    }
  }



//Event listener for  search button click
function init() {
 
    searchButton.on('click', getForecast);

  }
  
  init();


  