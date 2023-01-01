var key ='be11bc1fc11463fbd25d54db69d7b0ba';
var searchButton = $('.search-button');
var weatherSearch = $('.weather-search');
var showToday = $('#today');




function displayForecast(result){
    console.log(result);
        if (!result) {
            showToday.html('<p >No result found </p>');
           
            return;
         }
    
    }




//Function to get Forecast information of searched city
function getForecast(event) {

    event.preventDefault();

    var searchCity = weatherSearch.val().trim();
    console.log(searchCity);

    if (searchCity) {
        
      $.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${key}&units=metric`)
      .then(function (data) {
        
       displayForecast(data);
         
       });
       
  
  }

  }





//Event listener for search button

function init() {
    searchButton.click(getForecast);
   
  };
  
  init();


    
  
  
