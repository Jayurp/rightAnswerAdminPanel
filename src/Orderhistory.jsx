import React from "react";
import Sidebar from "./Sidebar";
import Orderhis from "./Orderhis";

function Orderhistory()
{
    return(

        <>
        <div className='grid-container'>
         <Sidebar/>
         <div id="currentOrders">
         <Orderhis/>
         </div>
        </div>
        </>
    )
}

export default Orderhistory;