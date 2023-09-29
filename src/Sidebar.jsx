import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck}
 from 'react-icons/bs'

function Sidebar(){
    return(
        <aside id='sidebar'>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                <BsCart3 className='icon_header'/> FOOD
                </div>
                <span className='icon close_icon'>X</span>
            </div>
            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <a href="/addItem">
                        <BsGrid1X2Fill className='icon'/>Add Items
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="/tableOrder">
                        <BsFillArchiveFill className='icon'/>Table Orders
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <BsFillGrid3X3GapFill className='icon'/>Order History
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="/">
                        <BsPeopleFill className='icon'/>Dashboard
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <BsListCheck className='icon'/>invoice
                    </a>
                </li>
            </ul>
        </aside>
        
    )
}
export default Sidebar