import axios from 'axios';
import React, { useState } from 'react'
import { HistoricalChart } from '../Config/api'
import { CryptoState } from '../Config/CryptoContext';


const CoinInfo = ({coin}) => {
  const {currency}=CryptoState();
  const [HistoricalData,setHistoricalData]=useState();
  const [days,setDays]=useState(1);
  const fetchData=async()=>{
    const {data}=await axios.get(HistoricalChart(coin.id,365,currency))
    setHistoricalData(data.prices);
  };
  return (
    <div>
      
    </div>
  )
}

export default CoinInfo
