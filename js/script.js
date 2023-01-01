var key ='be11bc1fc11463fbd25d54db69d7b0ba';
var searchButton = $('.search-button');
var weatherSearch = $('.weather-search');
var showToday = $('#today');




function displayForecast(result, searchCity){
    
        //Cleans html
        showToday.html('');
        if (!result) {
            showToday.html('<p >No result found </p>'); 
            return;
         }
         else{
            showToday.append(`
            <div>
            <h1>${searchCity} <img src="https://openweathermap.org/img/w/${result.weather[0].icon}.png" alt="weather icon "></h1>
            <h3>
            <p>Temp: ${Math.round(result.main.temp)} C </p>
            <p>Wind: ${result.wind.speed} KPH</p>
            <p>Humidity: ${result.main.humidity} % </p>
            </h3>

            </div>
            
            `)

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
        
       displayForecast(data, searchCity);
         
       });
       
  
  }

  }





//Event listener for search button

function init() {
    searchButton.click(getForecast);
   
  };
  
  init();


    
  
  
