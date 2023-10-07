import React from "react";
import Sidebar from "./Sidebar";
import NewOrders from "./NewOrders";
import CurrentOrders from "./currentOrders";


function TableOrder()
{
    return(

        <>
        <div className='grid-container'>
         <Sidebar/>
         <div id="newOrders">
         <NewOrders/>
         </div>
         <hr/>
         <div id="currentOrders">
         <CurrentOrders/>
         </div>
        </div>
        </>
    )
}

export default TableOrder;