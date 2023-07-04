import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';

const Users = () => {
    useEffect(() => {
        fetchUsers()
      }, [])
    
      const [totalUsers, setTotalUsers] = useState([]);
      const [users, setUsers] = useState({
        username: '',
        useremail: '',
        userpassword: '',
        userroleid: ''
      });
    
    
    
    const fetchUsers = async () => {
        try {
          let usersResult = await fetch('http://localhost:4000/api/v1/users/viewAllUser', {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
          });
          usersResult = await usersResult.json();
          setTotalUsers(usersResult.newUsers)
        } catch (err) {
        }
      }
      
      const handleChange = (event) => {
        const { name, value } = event.target
        setUsers({ ...users, [name]: value })
      }
      const handleSubmit = async (event) => {
        event.preventDefault()
        try {
          let result = await fetch('http://localhost:4000/api/v1/users/addUser', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(users)
          });
          result = await result.json();
          if (result.status) {
            await fetchUsers()
            Swal.fire({
              icon: 'success',
              title: 'Success',
              html: 'User is saved',
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          }
          console.log(result)
        } catch (error) {
          console.log(error)
        }
      }

    return (
        <>
            
            <div className="my-2"></div>
            <div className="container">
                <form method="post"  onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h3 className="title">
                                Add Users
                            </h3>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label htmlFor="">Enter User Name</label>
                                <input onChange={handleChange} type="text" name="username" id="username" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Enter User Email</label>
                                <input onChange={handleChange} type="text" name="useremail" id="useremail" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Enter User Password</label>
                                <input onChange={handleChange} type="text" name="userpassword" id="userpassword" className="form-control" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Enter RoleID</label>
                                <input onChange={handleChange} type="text" name="userroleid" id="userroleid" className="form-control" />
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-success">Create User</button>
                        </div>
                    </div>
                </form>
                <hr /><br />
                <div className="card">
                    <div className="card-header"><h3 className="title">All Users</h3></div>
                    <div className="card-body">
                        <div className="table">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {totalUsers.map((item)=>{
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users