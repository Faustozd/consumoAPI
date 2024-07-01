import React, { useEffect, useState } from 'react';
import './style.css';

function Home() {
    const [data, setData] = useState({
        celcius: 10,
        name: 'London',
        humidity: 10,
        speed: 2,
        image: '/Images/clouds.png'
    });
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleClick = async () => {
        if (name !== "") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=7d774f23acc15ee2a8ffbfccb2b28e94&units=metric`;

            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(response.status === 404 ? 'Invalid City Name' : 'An error occurred');
                }
                const data = await response.json();

                let imagePath = '';
                if (data.weather[0].main === "Clouds") {
                    imagePath = "/Images/clouds.png";
                } else if (data.weather[0].main === "Clear") {
                    imagePath = "/Images/clear.png";
                } else if (data.weather[0].main === "Rain") {
                    imagePath = "/Images/rain.png";
                } else if (data.weather[0].main === "Drizzle") {
                    imagePath = "/Images/drizzle.png";
                } else if (data.weather[0].main === "Mist") {
                    imagePath = "/Images/mist.png";
                } else {
                    imagePath = '/Images/clouds.png';
                }

                setData({
                    celcius: data.main.temp,
                    name: data.name,
                    humidity: data.main.humidity,
                    speed: data.wind.speed,
                    image: imagePath
                });
                setError('');
            } catch (error) {
                setError(error.message);
                console.error('Error fetching data:', error);
            }
        }
    };

    return (
        <div className='container'>
            <div className='weather'>
                <div className='search'>
                    <input type='text' placeholder='Enter City Name' onChange={e => setName(e.target.value)} />
                    <button onClick={handleClick}><img src="/Images/search.png" alt="Search" /></button>
                </div>
                <div className="error">
                    <p>{error}</p>
                </div>
                <div className='winfo'>
                    <img src={data.image} alt='Weather' />
                    <h1>{Math.round(data.celcius)}°C</h1>
                    <h2>{data.name}</h2>
                    <div className='details'>
                        <div className='col'>
                            <img src="/Images/humidity.png" alt="Humidity" />
                            <div className='humidity'>
                                <p>{Math.round(data.humidity)}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div className='col'>
                            <img src="/Images/wind.png" alt="Wind" />
                            <div className='wind'>
                                <p>{Math.round(data.speed)} km/h</p>
                                <p>Wind</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;


