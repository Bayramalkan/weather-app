import { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [loading, setLoading] = useState(null)
  const [coords, setCoords] = useState(null)
  const [current, setCurrent] =useState({
    temp_c:'',
    icon:'',
    feelslike_c:'',
    
  })

  const [location, setLocation] =useState({
    name:'',
    region:'',
    country:'',
    localtime:'',
  })

  const getLocation = () =>{
    if(!navigator.geolocation){
      alert("Konum bilginizi açmalısınız!")
      
    }else{
      setLoading(true)
      
      navigator.geolocation.getCurrentPosition(position=>{
        
        setCoords(`${position.coords.latitude},${position.coords.longitude}`)
      
      })
    }
  }

  useEffect(()=>{
    setLoading(true)
    const key = process.env.REACT_APP_WEATHER_API_KEY;
    const apiURL = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${coords}&aqi=no
    `
    fetch(apiURL).then(res=>res.json()).then((data)=>{
      //console.log(data);
      setCurrent({
        temp:data.current.temp_c,
        icon:data.current.condition.icon,
        feelslike_c:data.current.feelslike_c
      })
      setLocation({
        name:data.location.name,
        region:data.location.region,
        country:data.location.country,
        localtime:data.location.localtime,
      })
      setLoading(false)
    })
  },[coords])


  return (
    <div className="App">
        <span>{coords}</span>
        <button className="button" onClick={getLocation}>Hava Durumunu Getir</button>
       
        {!loading && <div>
        
        
        <div className="weather">
          <img src={current.icon} alt="weather" />
          <div>
            Sıcaklık
          <span>{current.temp}</span>
          </div>
          <div>
            Hissedilen
          <span>{current.feelslike_c}</span>
          </div>
        </div>
        <div>
          <div className="location">
            <span>{location.name}</span> - <span>{location.region}</span> - <span>{location.country}</span>
          </div>
          <div ><span className="time">{location.localtime}</span></div>
        </div>
        </div>
        }
        {loading && <div className="loading"><span>Yükleniyor</span> </div>}
       
    </div>
  );
}

export default App;
