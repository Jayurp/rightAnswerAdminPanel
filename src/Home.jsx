import React, { useEffect, useState } from 'react';
import 
{BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs';
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
 import Box from '@mui/material/Box';
 import InputLabel from '@mui/material/InputLabel';
 import FormControl from '@mui/material/FormControl';
 import NativeSelect from '@mui/material/NativeSelect';

function Home(){

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const [orderData, setOrderData] = useState([]);
    const [dates, setDates] = useState([]);
    const [month, setMonth] = React.useState();
    var temp_month = currentMonth;
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

      useEffect(() => {
        setMonth(currentMonth);
        console.log(month);
         },[]);

      useEffect(() => {
        if (month !== monthNames[currentMonth]) {
          getData(month);
        }
         }, [month]);

    const handleChange = (event) => {
        const selectedMonth = event.target.value;
        setMonth(selectedMonth);
      };

      function getData(month)
      {
        fetch('http://localhost:4000/getOrderData', {
            method: 'POST',
            body: JSON.stringify({
                "branch_name": "vadodara",
                "month":monthNames[month]
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
      }
      
    return(
        <main className='main-container'>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>
            <Box sx={{ minWidth: 120, maxWidth: 160, backgroundColor:"#dbd5e8", padding: "1%", borderRadius: 3 }}>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Month
                </InputLabel>
                <NativeSelect
                onChange={handleChange} 
                defaultValue={currentMonth}
                inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                }}
                >
                <option value={0}>January</option>
                <option value={1}>February</option>
                <option value={2}>March</option>
                <option value={3}>April</option>
                <option value={4}>May</option>
                <option value={5}>June</option>
                <option value={6}>July</option>
                <option value={7}>August</option>
                <option value={8}>September</option>
                <option value={9}>October</option>
                <option value={10}>November</option>
                <option value={11}>December</option>
                </NativeSelect>
            </FormControl>
            </Box>
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