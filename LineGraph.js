import React, {useState, useEffect} from 'react'
import numeral from 'numeral'
import {line} from 'react-chartjs-2';


const options ={
    legend: {
        display: false,
    },
    elements:{
        point:{
            radius:0,
        },
    

    maintainAspectRatio: false,
    tooltips:{
        mode: 'index',
        intersect: false,
        callbacks:{
            label: function (tooltipItem, data){
                return numeral(tooltipItem.value).format('+0,0');
            },
        },
    },
        
  scales:{
        xAxes: [
        {
            type: 'time',
            time: {
                format: 'MM/DD/YY',
                tooltipFormat: 'll'
            },
        },
    ],

         yAxes:[
        {
            dridLines:{
                display: false,
            },
            ticks:{
                callback function (value, index, values){
                    return numeral(value).format('0a')
                    },

                },
            },
        ],
    },
};


  
     const [data, setData] = useState({})
   
    
    const buildChartData = (data, casesType='cases') => {
        const chartData = [];
        let lastDataPoint;

        for(let date in data.cases) {
            if (lastDataPoint){

                const newDataPoint ={
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                }
            chartData.push(newDataPoint);
            }
            lastDataPoint = data['cases'][date];
            
        };
        return chartData;
    

    function LineGraph({ casesType = 'cases'}){

    useEffect(() => {
        const fetchData = async () => {
          await  fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
            .then(response => {
                return response.json();
            })
            .then((data) => {
                let chartData = buildChartData(data,casesType);
                //const chartData = buildChartData(data);
                setData(chartData);
                console.log(data);
            });
        }
        fetchData();
        
    },  []);

    }
    
    return (
        <div>
            {date?.length > 0 && (

                <line 
                data={{
                    datasets : [{
                        backgroundColor: 'rgba(204, 16, 52, 0.5)',
                        borderColor: '#CC1034',
                        data : data,
                    }]
                }} 
                    options = {options}
                />
            )}
        </div>
    );
}

export default LineGraph
