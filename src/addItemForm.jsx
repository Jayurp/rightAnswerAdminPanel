import {React, useState} from "react";
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import App from './App.css'
import { ref as sRef, uploadBytes, getDownloadURL, getStorage } from 'firebase/storage';
import { storage } from "./firebase";


function AddItemForm(){

    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();
    const [image, setImage] = useState();
    const [url, setUrl] = useState("");

    const onCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const onPriceChange = (e) => {
        setPrice(parseInt(e.target.value));
    }

    const onImageChange = (e) => {
        setImage(e.target.files[0]);
    }

    const submitForm = () => {

        const imageRef = sRef(storage, "menu/"+category+"/"+name+"/pic");
        uploadBytes(imageRef, image).then(() => 
        {
            getDownloadURL(imageRef)
        .then((url) =>
        {
            setUrl(url);
            var data = {
                "name":name,
                "parent_category":category,
                "description":description,
                "image_link":url,
                "branch_name":"vadodara",
                "price":price
              }

              fetch('http://localhost:4000/editMenu', {
            method: 'POST',
            body: JSON.stringify(data),
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
                    if(data["status"] == true)
                    {
                        alert("Successfully Added");
                        document.getElementById("category").value = "";
                        document.getElementById("name").value = "";
                        document.getElementById("description").value = "";
                        document.getElementById("price").value = "";
                        document.getElementById("myfile").value = "";
                    }
                })
                .catch(error => {
                console.error('Fetch error:', error);
                });
        });
        });
    }

    return(
        <>
        <h1 className="title">Add Item Form</h1>
        <div className="form-container">
            <input type="text" onChange={onCategoryChange} id="category"  className="text-field"  placeholder="Enter Category" />
            <input type="text" onChange={onNameChange} id="name"  className="text-field"  placeholder="Enter Item name" />
            <input type="text" onChange={onDescriptionChange} id="description"  className="text-field"  placeholder="Enter Description" />
            <input type="number" onChange={onPriceChange} id="price"  className="text-field"  placeholder="Enter Price" /><br></br>
            <label>Choose a file from you device</label><br></br>
            <input type="file" onChange={onImageChange} id="myfile" name="myfile" />
        <button onClick={submitForm} className="submit-button">Submit</button>
        </div>
        </>
    );
}

export default AddItemForm