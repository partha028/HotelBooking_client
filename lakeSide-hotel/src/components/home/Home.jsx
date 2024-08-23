import React from 'react';
import HeaderMain from '../layout/HeaderMain';
import Parallax from '../common/Parallax';
import HotelService from '../common/HotelService';
import RoomCarousel from '../common/RoomCarousel';

const Home = () => {
  return (
    <section >
        <HeaderMain/>
        <section className='container'>
          <RoomCarousel/>
          <Parallax/>
          <HotelService/>
          <Parallax/>
          <RoomCarousel/>
        </section>
    </section>
  )
}

export default Home