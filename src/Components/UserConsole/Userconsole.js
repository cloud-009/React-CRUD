import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Userconsole.css';
import { useNavigate } from "react-router-dom";


function Userconsole() {
    const [users, setUsers] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:4000/users')
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => { console.log(err) });
    }, []);

    const routeToAddUser = () => {
        navigate('/adduser')
    }

    const handleFormEdit = (event) => {
        let data = event;
        axios.get(`http://localhost:4000/users/${data}`)
            .then((res) => {
                // console.log(res.data);
                navigate('/edituser/' + event);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleUserDelete = (event) => {
        axios.delete(`http://localhost:4000/users/${event}`)
            .then((res) => {
                // console.log(res)
                axios.get('http://localhost:4000/users')
                    .then((res) => {
                        setUsers(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            })
            .catch((err) => console.log(err));
    }


    return (
        <>
            <div className='user-container'>
                <h2 className='user'>User Management</h2>
                <div className='inside-container'>
                    <button className='user-button' onClick={routeToAddUser}>Add User</button>
                </div>
            </div>
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Contact</th>
                            <th>Action Buttons</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.phone}</td>
                                    <td className='action-buttons'>
                                        <i className='fa-solid fa-user-pen edit-user' style={{ cursor: 'pointer', marginRight: '20px' }}
                                            onClick={() => handleFormEdit(user.id)}></i>
                                        <i className='fa-solid fa-trash-can' style={{ cursor: 'pointer' }}
                                            onClick={() => handleUserDelete(user.id)}></i>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Userconsole