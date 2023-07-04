import React, { useState, useEffect } from 'react'
import { Header } from "./header";
import Swal from 'sweetalert2';
const Groups = () => {
  
  useEffect(() => {
    fetchGroups()
  }, [])

  const [totalGroups, setTotalGroups] = useState([]);
  const [groups, setGroups] = useState({
    name: '',
    description: ''
  });
  const fetchGroups = async () => {
    try {
      let groupsresult = await fetch('http://localhost:4000/api/v1/groups/viewAllGroups', {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
      });
      groupsresult = await groupsresult.json();
      setTotalGroups(groupsresult.newGroup)
    } catch (err) {
    }
  }
  const handleChange = (event) => {
    const { name, value } = event.target
    setGroups({ ...groups, [name]: value })
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      let result = await fetch('http://localhost:4000/api/v1/groups/addGroup', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(groups)
      });
      result = await result.json();
      console.log(result);
      if (result.status) {
        await fetchGroups()
        Swal.fire({
          icon: 'success',
          title: 'Success',
          html: 'Group is saved',
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className="my-2"></div>
      <div className="container">
        <form method="post" onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h3 className="title">
                Add Group
              </h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="">Enter Group Name</label>
                <input onChange={handleChange} type="text" name="name" id="name" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="">Enter Group Description</label>
                <input onChange={handleChange} type="text" name="description" id="description" className="form-control" />
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-success">Create Group</button>
            </div>
          </div>
        </form>
        <hr /><br />
        <div className="card">
          <div className="card-header"><h3 className="title">All Groups</h3></div>
          <div className="card-body">
            <div className="table">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Descirption</th>
                  </tr>
                </thead>
                <tbody>
                  {totalGroups && totalGroups.length > 0 ? (
                    totalGroups.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No Groups available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Groups