import React, { useEffect, useState } from "react";
import './NewOrders.css';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Orderhis()
{

    const [newOrderData, setNewOrderData] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [popUpArray, setPopUpArray] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [taxedRate, setTaxedRate] = useState([]);
    const [Index, setIndex] = useState();
    var insideData = [];


    const handleClickOpen = (index) => {
        setIndex(index);
        Object.keys(newOrderData[index]["orderItems"]).forEach(key => {
            insideData.push(newOrderData[index]["orderItems"][key]);
          });
          setPopUpArray(insideData);
          setTaxedRate(newOrderData[index]["total_price"] + (newOrderData[index]["total_price"] * 0.05));
        setOpen(true);
      };

      const acceptOrder = () => {
        fetch('http://localhost:4000/invoice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newOrderData[Index]),
        })
        .then(response => {
            if (response.ok) {
                return response.blob();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(blob => {
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 1000);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        setOpen(false);
      };

      const handleClose = () => {
        setOpen(false);
      };

    useEffect(() => {
        fetch('http://localhost:4000/getPastOrders', {
        method: 'POST',
        body: JSON.stringify({
            "month":"10",
            "year":"2023"
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
                console.log(data);
                var temp_order = [];
                var temp_itemData = [];
                var temp_totalAmount = [];
                Object.keys(data).forEach(key => {
                    Object.keys(data[key]).forEach(key2 => {
                        temp_order.push(data[key][key2]);
                        Object.keys(data[key][key2]).forEach(key3 => {
                            if(key3 == "orderItems")
                            {
                                temp_itemData.push(data[key][key2][key3]);
                            }
                        });
                    });
                  });
                  setNewOrderData(temp_order);
                  setItemData(temp_itemData);
            })
            .catch(error => {
            console.error('Fetch error:', error);
            });
      },[]);

    return(
        <>
        <div id="orderCards">
        {newOrderData.map((OrderData, index) => (
            <>
            <Card  key={OrderData.orderItems} sx={{maxWidth:350, minWidth:350, marginTop:"10%", marginLeft:"25%"}}>
            <CardContent>
            <Typography variant="h5" component="div">
            Table Number : {OrderData.table}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Total Quantity: {OrderData.total_quantity}
                <br/>
                Total Price: ₹{OrderData.total_price}
                <br/>
                Time: {OrderData.hour}:{OrderData.minute}
            </Typography>
            </CardContent>
            <CardActions>
            <Button size="small" onClick={() => handleClickOpen(index)}>Show More</Button>
            </CardActions>
            </Card>

            <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">
            Table Number: {OrderData.table}
            </DialogTitle>
            <DialogContent>
            <TableContainer>
                <Table sx={{ minWidth: 500 }} aria-label="spanning table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Desc</TableCell>
                        <TableCell align="right">Qty.</TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
            {popUpArray.map((PopUpArray) => (  
                <>
                    <TableRow key={PopUpArray.item}>
                    <TableCell>{PopUpArray.item}</TableCell>
                    <TableCell align="right">{PopUpArray.quantity}</TableCell>
                    <TableCell align="right">₹{PopUpArray.price}</TableCell>
                    </TableRow>
                </>
            ))}
            <TableRow>
                <TableCell rowSpan={3} />
            </TableRow>
            <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">5%</TableCell>
            </TableRow>
            <TableRow>
                <TableCell><b>Total</b></TableCell>
                <TableCell align="right">
                    <b>
                    ₹{taxedRate}
                    </b>
                </TableCell>
            </TableRow>
            </TableBody>
                </Table>
                </TableContainer>
            </DialogContent>
            <DialogActions>
            <Button onClick={acceptOrder} id="downloadButton" autoFocus>
                Get Invoice
            </Button>
            </DialogActions>
            </Dialog>
            </>
        ))}

        </div>
        </>
    )
}

export default Orderhis;