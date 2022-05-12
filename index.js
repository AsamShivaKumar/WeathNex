async function getWeather(long,lati){
    const url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lati + "&lon=" + long + "&exclude=hourly,daily,minutely&units=metric&appid=484299a7cbef60fe5d19149e25fc7710";
    const response = await fetch(url);
    const data = await response.json();
    document.querySelector(".temparature h2").innerHTML = data.current.temp + " C";
    document.querySelector(".temparature span").innerHTML += " " + data.current.feels_like + " C";
    document.querySelector(".descp h2").innerHTML = data.current.weather[0].description;
    document.querySelector(".icon").setAttribute("src", "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png");
    document.querySelector(".one span:nth-child(1)").innerHTML += " - " + data.current.humidity + "%";
    document.querySelector(".one span:nth-child(2)").innerHTML += " - " + data.current.wind_speed + "m/s";
    document.querySelector(".one span:nth-child(3)").innerHTML += "-" + data.current.clouds + "%";
    document.querySelector(".two span:nth-child(1)").innerHTML += "-" + data.current.pressure + "hPa";
    document.querySelector(".two span:nth-child(2)").innerHTML += "-" + data.current.dew_point + " C";
    document.querySelector(".two span:nth-child(3)").innerHTML += " - " + data.current.uvi;
    document.querySelector(".loader").classList.remove("load");
}

async function getWeatherWithName(city){
      var response = await fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=484299a7cbef60fe5d19149e25fc7710");
      var data = await response.json();
      document.querySelector(".loader").classList.remove("load");
      if(data.cod >= 200 && data.cod < 300){
         document.querySelector(".cityName").innerHTML = "<i class='fa fa-map-marker' aria-hidden='true'></i> " + data.name;
         document.querySelector(".temparature h2").innerHTML = data.main.temp + " C";
         document.querySelector(".temparature span").innerHTML = "Feels like " + data.main.feels_like + " C";
         document.querySelector(".descp h2").innerHTML = data.weather[0].description;
         document.querySelector(".icon").setAttribute("src", "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
         document.querySelector(".one span:nth-child(1)").innerHTML = "Humidity - " + data.main.humidity + "%";
         document.querySelector(".one span:nth-child(2)").innerHTML = "Wind - " + data.wind.speed + "m/s";
         document.querySelector(".one span:nth-child(3)").innerHTML = "Cloudiness-" + data.clouds.all + "%";
         document.querySelector(".two span:nth-child(1)").innerHTML = "Pressure-" + data.main.pressure + "hPa";
         document.querySelector(".two span:nth-child(2)").innerHTML = "Wind Degree-" + data.wind.deg;
         document.querySelector(".two span:nth-child(3)").innerHTML = "Visibility - " + data.visibility/1000 + "km";

      }else{
        console.log("City not found!");
        document.querySelector(".notFound").classList.add("open");
        setTimeout( function(){
          document.querySelector(".notFound").classList.remove("open")},2000);
      }
}

navigator.geolocation.getCurrentPosition((pos) => {
          document.querySelector(".loader").classList.add("load");
          getWeather(pos.coords.longitude,pos.coords.latitude);
});

document.querySelector(".fa-search").addEventListener("click", function(){
         var inp = document.querySelector(".cityInput");
         if(inp.value !== ""){
            document.querySelector(".loader").classList.add("load");
            getWeatherWithName(inp.value.trim());
            document.querySelector(".cityInput").value = "";
         }
});

document.querySelector(".fa-times-circle").addEventListener("click",function(){
         document.querySelector(".notFound").classList.remove("open");
});

// mapDiv
document.querySelector(".fa-arrow-circle-right").addEventListener("click", function(){
         document.querySelector(".mapDiv").classList.add("displayMap");
});

document.querySelector(".fa-arrow-circle-left").addEventListener("click", function(){
         document.querySelector(".mapDiv").classList.remove("displayMap");
});
