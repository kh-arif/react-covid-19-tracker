import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, CardContent,Card } from '@material-ui/core';import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table'; 
import {sortData} from './Fun';
//import LineGraph from './LineGraph';
// "https://disease.sh/v3/covid-19/countries"

//USEEFECT =Runs a piece of code 
// basesd on a given condition 

function App() {

  const [countries, setContries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(()=> {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) =>{
      setCountryInfo(data);
    });
  }, []);


  useEffect(()=>{
    const getCountriesData = async() =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) =>{
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }
        ));
        const sortedData = sortData(data); 
          setTableData(sortedData);
          setContries(countries); 
      });
    };

    getCountriesData();
  },[]);

  const onCountryChange = async (event) =>{
    const countryCode = event.target.value;

    const url = 
      countryCode === 'worldwide'
       ? "https://disease.sh/v3/covid-19/all" 
       : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setCountry(countryCode);
      setCountryInfo(data);
       
    });
  
  };

  console.log('CountryData123', tableData)

  return (
    <div className="app">
      <div className='app_left'>


        {/*Header*/} 
        <div className='app_header'>
    
         {/*Title + Select input dropdown*/}
         <h1>COVID-19 TRACKER</h1>
          <FormControl className='app_dropdown'>

          {/*Loop through all the countries
          and show a drop down 
        list of options */}
            <Select variant='outlined' onChange={onCountryChange} value={country}>
             <MenuItem value='worldwide'>Worldwide</MenuItem>
              {countries.map((country) =>(
                <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>

        {/*infoBox*/}
        <div className='app_stats'>

          <InfoBox 
          title='Coronavirus Cases' 
          cases={countryInfo.todayCases} 
          total={countryInfo.cases}/>
              
          <InfoBox 
          title='Recovered' 
          cases={countryInfo.todayRecovered} 
          total={countryInfo.recovered}/>

          <InfoBox 
          title='Deaths' 
          cases={countryInfo.todayDeaths}  
          total={countryInfo.deaths}/>
        </div>

        {/*Map*/}
        <Map />
      </div>
      <Card className='app_right'>
        <CardContent>
        {/*Table*/}
          <h3>Live country</h3>
          <Table countries={tableData}/>

          <h3>Worldwide new Cases</h3>
      {/*Graph*/}
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
