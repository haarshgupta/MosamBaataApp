import React, { useEffect, useRef, useState } from 'react'
import './weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import snow_icon from '../assets/snow.png'
import fog_icon from '../assets/fog.png'
import rain_icon from '../assets/rain.png'
import partly_cloudy_night_icon from '../assets/partly-cloudy-night.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'




const weather = () => {

    const inputRef = useRef();
    const [weatherData,setWeatherData] = useState(false);
    const allIcon = {
        "fog" : fog_icon,
        "rain" : rain_icon,
        "partly-cloudy-night" : partly_cloudy_night_icon,
        "clear" : clear_icon,
        "cloud" : cloud_icon,
        "wind" : wind_icon,
        "snow" : snow_icon,
        "drizzle" : drizzle_icon,
        "humidity" : humidity_icon

    }

    const search = async (city)=>{

        if(city == ""){
            alert("Enter City Name!!");
            return
        }
        try{
            const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=us&key=4DXP5U7PSKYKZUJLRA8B5Z2RM&contentType=json`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const icon = allIcon[data.currentConditions.icon] || clear_icon;
            setWeatherData({
                humidity : data.currentConditions.humidity,
                windSpeed : data.currentConditions.windspeed,
                temperature : data.currentConditions.temp,
                location : data.address,
                icon : icon
            })
        }
        catch(error)
        {
            setWeatherData(false);
            console.log("Error in fetching error");
        }
    }

    useEffect(()=>{
        search();
    },[])

  return (
    <div className='weather'>
    <div className="search-bar">
        <input ref={inputRef} types="text" placeholder='Search'></input>
        <img src={search_icon} alt=''onClick={() =>search(inputRef.current.value)}/>
    </div>

    {weatherData?
    <>
        <img src={weatherData.icon} className='weather-icon'></img>
    <p className='temperature'>{weatherData.temperature}°c</p>
    <p className='location'>{weatherData.location}</p>
    <div className="weather_data">
        <div className="col">
            <img src={humidity_icon} alt=""></img>
            <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
            </div>
        </div>
        <div className="col">
            <img src={weatherData.icon} alt=""></img>
            <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
            </div>
        </div>
        
    </div>
    </>:<></>

    }


    </div>
  )
}

export default weather
