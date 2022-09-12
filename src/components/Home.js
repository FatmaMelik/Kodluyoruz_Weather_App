import React,{useEffect, useState, useContext} from 'react'
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
// import { LastCityContext } from '../Context/LastCityContext';

const Search=styled.input`
    font-family: "Lucida Sans Typewriter";
    position: relative;
    margin:12px; 
    margin-top:60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity:0.80;
    width: 300px;
    height: 35px;
    border-radius: 24px; 
    border-style:solid;
    border-widht:1px;
    border-color:green;
    font-family: "Lucida Sans Typewriter";
    font-size: 12px;
    text-indent: 0.5rem;
    background: white;
    &:hover {
        border-color: rgb(170, 251, 9);;
    }
    &:focus{
        outline: none;
    }
`
const Nav = styled.div`
    font-family: "Lucida Sans Typewriter";
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-radius:26px;
    opacity:0.80;

    button{
        margin: 22px;
        border-radius:22px;
        width:100px;
        height:35px;
        font-size:16px;
        color:white;
        background-color:green;
        border: none;
        &:hover {
          background-color: rgb(28, 222, 35);
          cursor:pointer;
          animation-duration: 5s;
          transition: background-color 2.2s;
          transition-duration: 3s;
          transition: 1.5s;
          letter-spacing: 5px;
        }
    }
`

const Main = styled.div`
    opacity: 0.85;
    width: 1300px;
    height:450px;
    position:relative;
    display=flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    
`

const WeatherDiv = styled.div`
    margin: 25px;
    text-align: center;
    justify-content: center; 
    float:left;
    width:600px;
    background-color: gray;
    height:400px;
    border-radius: 24px;
`
const CityDiv = styled.div`
    float:left;
    width:600px;
    margin:25px;
    background-color: green;
    height:400px;
    border-radius: 24px;

`

const Temp= styled.div`
    width:600px;
    height:200px;
    display=flex;
    flex-direction: row;   
    p{
        float:left;
        margin-top:50px;
        margin-left:50px;
        font-size:62px;
    }
    img{
        float:right;
        margin-right:50px;
        margin-top:50px;
    }
`
const Detail=styled.div`
    width:600px;
    height:200px;
    display=flex;
    flex-direction: row;

    div{
        display=flex;
        flex-direction: row;
        float:left;
        margin-right:40px;
        margin-left:40px;
        margin-top:40px;

    p{
        font-size:26px;
    }
    }
`

const Home = (isAuth) => {
    const [cityName,setCityName] = useState();
    const [weather,setWeather] = useState({
        day:'',
        morn:'',
        night:'',
        description:'',
    });
    const [control,setControl] = useState(false);
    // const { lastLocation, setLastLocation} = useContext(LastCityContext);
    const part='current,minutely,hourly,alerts'
    let navigate = useNavigate();

    useEffect(() => {
        
    },[isAuth])

    const getCityName= (e) => {
        setCityName(e.target.value);

    }
    const showCity= async () => {
        const response = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=8f1c47e55d1fd073acb06fdf1fc5b003`,
          );
        const data = await response.data[0];
        const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=${part}&appid=ec7d1c0e712571e97e77329fca7e15f3&units=metric&lang=tr`
          );
        const data2 = await res.data.daily;
        console.log(data2[0])
        setWeather({
            day:data2[0].temp.day,
            morn:data2[0].temp.morn,
            night:data2[0].temp.night,
            description:data2[0].weather[0].description,
        })
        localStorage.setItem('city', cityName);
        setControl(true);
    }

    const LogOut=() => {
        isAuth=false
        localStorage.setItem('user', false);
        isAuth ? navigate("/home") : navigate("/");
    }
    return(
        <div align='center'>
            <Search placeholder='Şehir' onChange={getCityName}/>
            <Nav>
                <button onClick={showCity}>Göster</button>
                <button onClick={LogOut}>Çıkış</button>
            </Nav>
            <Main>
                <CityDiv>
                    <h1>Son Aranan Şehirler</h1>
                    
                </CityDiv>
                <WeatherDiv>
                    <Temp>
                        <p>{weather.day}</p>
                        {weather.description.toUpperCase()==="AÇIK" ? (
                            <img src='https://img.icons8.com/doodle/96/000000/sun--v1.png'/>
                        ):( weather.description.toUpperCase()==="HAFIF YAĞMUR" ? (
                            <img src='https://img.icons8.com/doodle/96/1A1A1A/rain--v1.png'/>
                        ):(
                            <p></p>
                        )
                        )}
                    </Temp>
                    <Detail>
                        {control ? (
                        <>
                        <div>
                            <h2>Gündüz</h2>
                            <p>{weather.morn}</p>
                        </div>
                        <div>
                            <h2>Gece</h2>
                            <p>{weather.night}</p>
                        </div>
                        <div>
                            <h2>Açıklama</h2>
                            <p>{weather.description.toUpperCase()}</p>
                        </div>
                        </>
                        ):(
                            <p></p>
                        )}
                        
                    </Detail>
                </WeatherDiv>
                
            </Main>
        </div>
    )
}

export default Home;