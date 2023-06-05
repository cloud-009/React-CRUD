import React, { useEffect, useState } from 'react';
// import './AddUser.css';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {

    let userID = useParams();
    const navigate = useNavigate();
    const [store, setStore] = useState([]);

    const [formControls, setFormControls] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        gender: ""
    });

    const handleInputChange = (event) => {
        let user = { ...formControls };
        user[event.target.name] = event.target.value;
        setFormControls(user);
    }

    useEffect(() => {
        axios.get(`http://localhost:4000/users/${userID.id}`)
            .then((res) => {
                setFormControls(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    function submitHandler(event) {
        event.preventDefault();
        const formData = {
            firstname: formControls.firstname,
            lastname: formControls.lastname,
            email: formControls.email,
            phone: formControls.phone,
            gender: formControls.gender
        }
        setStore([formData]);
        axios.put('http://localhost:4000/users/' + userID.id, formData)
            .then((res) => {
                console.log(res);
                navigate('/');
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <>
            <div className='top-container'>
                <form className='container'>
                    <div className='form-group'>
                        <div>
                            <label htmlFor="firstname">FirstName</label>
                            <input className='form-control  col-6' type="text" onChange={handleInputChange}
                                id='firstname' value={formControls.firstname} name="firstname" />
                        </div>
                        <div>
                            <label htmlFor="lastname">LastName</label>
                            <input className='form-control  col-6' type="text" name='lastname'
                                onChange={handleInputChange} id='lastname' value={formControls.lastname}></input>
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input className='form-control  col-6' type="email" name='email'
                                onChange={handleInputChange} id='email' value={formControls.email}></input>
                        </div>
                        <div>
                            <label htmlFor="contact">Contact Number</label>
                            <input className='form-control  col-6' type="text" name='phone'
                                onChange={handleInputChange} id='phone' value={formControls.phone}></input>
                        </div>
                        <div>
                            <label htmlFor="gender">Gender</label>
                            <input className='form-control col-6' type="text" name='gender'
                                onChange={handleInputChange} id='gender' value={formControls.gender}></input>
                        </div>
                    </div>
                </form>
                <div className='bottom'>
                    <button type='button' className='btn btn-primary' onClick={submitHandler}>Update User</button>
                </div>
            </div>
        </>
    )
}

export default EditUser