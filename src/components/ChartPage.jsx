import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";
import axios from 'axios'

const ChartPage = () => {
    const [data,setData] = useState([]);
    const getData = async() =>{
        const res = await axios(`/users/chart`);
        setData(res.data)
    }

    useEffect(()=>{
        getData();
    },[])
    // const data = [
    //     ["Year", "Sales", "Expenses", "Profit"], 
    //     ["2014", 1000, 400, 200],
    //     ["2015", 1170, 460, 250], 
    //     ["2016", 660, 1120, 300], 
    //     ["2017", 1030, 540, 350],
    //     ];
        const options = { 
            chart: {
            title: "사용자별 댓글수",
            subtitle: "Sales, Expenses, and Profit: 2014-2017",
            }, 
            };
  return (
    <div>
        <Chart 
        chartType="Bar"
        width="100%" height="400px"
        data={ data }
        options={ options }/>
        <Chart chartType="Line"
        width="100%" height="400px"
        data={ data }
        options={ options }/>
    </div>
  )
}

export default ChartPage