import React from 'react';
import Navbar from './Navbar';
import VendorImage from './image';
import SimpleBottomNavigation from './Bottomnav';
import About from './Aboutus';
export default function Home(){
    return(
    <>
        <Navbar/>
        <VendorImage/>
        <About/>
        <SimpleBottomNavigation/>
    </>
    );
}