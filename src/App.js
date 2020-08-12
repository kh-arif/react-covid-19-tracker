import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select } from '@material-ui/core';import './App.css';
// "https://disease.sh/v3/covid-19/countries"

//USEEFECT =Runs a piece of code 
// basesd on a given condition 

function App() {

  const   [countries, setContries] = useState([]);


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
          setContries(countries); 
      });
    };

    getCountriesData();
  },[]);


  return (
    <div className="App">
      <div className='app_header'>

      <h1>COVID-19 TRACKER</h1>
      <FormControl className='app_dropdown'>
        <Select variant='outlined' value='abc'>
          {/*Loop through all the countries
          and show a drop down 
          list of options */}
        
          {countries.map((country) =>(
            <MenuItem value={country.value}>{country.name}</MenuItem>
          ))}


        </Select>
      </FormControl>

      {/*Header*/} 

      {/*Title + Select input dropdown*/}
      
      
      {/*infoBox*/}
      {/*infoBox*/}
      {/*infoBox*/}

      {/*Table*/}
      {/*Graph*/}

      {/*Map*/}
      </div>

    </div>
  );
}

export default App;
