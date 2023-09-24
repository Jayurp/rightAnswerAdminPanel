import React, { useEffect, useState } from 'react';
import 
{BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs';
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';

function Home(){

    const [orderData, setOrderData] = useState([]);
    const [dates, setDates] = useState([]);

        useEffect(() => {
            fetch('http://localhost:4000/getOrderData', {
        method: 'POST',
        body: JSON.stringify({
            "branch_name": "vadodara"
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
            })
            .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
            })
            .then(data => {
                var temp_dates = [];
                var temp_objs = [];
                Object.keys(data).forEach(key => {
                    temp_dates.push(key);
                    temp_objs.push(data[key]);
                  });
                  setDates(temp_dates);
                  setOrderData(temp_objs);
            })
            .catch(error => {
            console.error('Fetch error:', error);
            });
        }, []);
      
    return(
        <main className='main-container'>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>

            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h3>DISHES</h3>
                        <BsFillArchiveFill className='card_icon'/>
                    </div>
                    <h1>50</h1>
                </div>

                <div className='card'>
                    <div className='card-inner'>
                        <h3>CATEGORIES</h3>
                        <BsFillGrid3X3GapFill className='card_icon'/>
                    </div>
                    <h1>10</h1>
                </div>

                <div className='card'>
                    <div className='card-inner'>
                        <h3>CUSTOMERS</h3>
                        <BsPeopleFill className='card_icon'/>
                    </div>
                    <h1>30</h1>
                </div>

                <div className='card'>
                    <div className='card-inner'>
                        <h3>ALERTS</h3>
                        <BsFillBellFill className='card_icon'/>
                    </div>
                    <h1>22</h1>
                </div>
            </div>

            <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={orderData}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date"/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" name="Revenue" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={orderData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>

        </div>
        </main>
    )
}
export default Home