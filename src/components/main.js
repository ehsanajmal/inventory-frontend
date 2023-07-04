import React, { useState, useEffect } from "react";
import { Header } from "./header";
import Swal from "sweetalert2";
const Main = () => {
  useEffect(() => {
    fetchRoles();
  }, []);

  const [totalRoles, setTotalRoles] = useState([]);
  const [roles, setRoles] = useState({
    name: "",
    description: "",
  });
  const fetchRoles = async () => {
    try {
      let result = await fetch("http://localhost:4000/api/v1/roles/viewAll", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      result = await result.json();
      setTotalRoles(result.newRole);
    } catch (err) {}
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setRoles({ ...roles, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let result = await fetch("http://localhost:4000/api/v1/roles/addRoles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(roles),
      });
      result = await result.json();
      if (result.status) {
        await fetchRoles();
        Swal.fire({
          icon: "success",
          title: "Success",
          html: "Role is saved",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <div className="my-2"></div>
      <div className="container">
        <form method="post" onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-header">
              <h3 className="title">Add Role</h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="">Enter Role Name</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="">Enter Description</label>
                <input
                  onChange={handleChange}
                  type="text"
                  name="description"
                  id="description"
                  className="form-control"
                />
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-success">
                Create
              </button>
            </div>
          </div>
        </form>
        <hr />
        <br />
        <div className="card">
          <div className="card-header">
            <h3 className="title">All Roles</h3>
          </div>
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
                  {totalRoles && totalRoles.length > 0 ? (
                    totalRoles.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No Roles available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
