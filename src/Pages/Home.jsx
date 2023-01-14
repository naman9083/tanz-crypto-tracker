import { Pagination } from '@mui/material'
import React from 'react'
import Banner from '../Components/Home/Banner'
import Coinlist from '../Components/Home/Coinlist'

const Home = () => {
  return (
    <div>
        <Banner/>
        <Coinlist/>
        <Pagination/>
      
    </div>
  )
}

export default Home
