import React from "react";
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'

function Landing(){


    return(
        <>
            <div className='grid-container'>
         <Sidebar />
         <Home />
         </div>
        </>
    );
}

export default Landing