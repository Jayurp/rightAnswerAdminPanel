import React from "react";
import Sidebar from "./Sidebar";
import NewOrders from "./NewOrders";

function TableOrder()
{
    return(

        <>
        <div className='grid-container'>
         <Sidebar/>
         <NewOrders/>
        </div>
        </>
    )
}

export default TableOrder;