import React from 'react'
import Banner from '../../components/Banner'
import Categories from './Categories'
import SpecialsDishes from './SpecialsDishes'
import Testimonials from './Testimonials'
import OurServices from './OurServices'


const Home = () => {
  return (
    <div className=''>
      <Banner/>
      <Categories/>
      <SpecialsDishes/>
      <Testimonials/>
      <OurServices/>
    </div>
  )
}

export default Home
