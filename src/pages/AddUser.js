import React, { Component } from "react";
import "./user.css";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      name: "",
      email: "",
      password: "",
      token: window.sessionStorage.getItem("token"),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { role, name, email, password } = this.state;
    console.log(role, name, email, password);
    if(email !== undefined && password.length >= 6 && role == "User") {
      fetch("https://smart-farm-backend.vercel.app/api/user/signup", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          role,
          name,
          email,
          password,
        }),
      })
      .then((res) => res.json())
        .then((data) => {
            console.log(data, "userAdded");
            if(data.message == "New user successfully registered") {
              alert("User has been added");
              window.location.href="./dashboard";
            } else {
              alert("User has already exists");
            }
        });
    } else if(role == "Admin") {
      fetch("https://smart-farm-backend.vercel.app/api/user/admin_signup", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "x-access-token": this.state.token,
        },
        body: JSON.stringify({
          role,
          name,
          email,
          password,
        }),
      })
      .then((res) => res.json())
        .then((data) => {
            console.log(data, "adminAdded");
            if(data.message == "New admin successfully registered") {
              alert("Admin has been added");
              window.location.href="./dashboard";
            } else {
              alert("User has already exists");
            }
        });
    } else {
      alert('Please complete filling form');
    }
  }
  render() {
    return (
      <>
        <div className="outer-border">
          <div className="outer-user">
            <div className="card">
              <form onSubmit={this.handleSubmit}>
                <h3>Add User</h3>
                <div class="form-group">
                  <label for="role">Role</label>
                  <br />
                  <select
                      id="role"
                      className="btn btn-primary"
                      placeholder="Select Role"
                      onChange={ (e) => this.setState({ role: e.target.value })}
                    >
                      <option></option>
                      <option id="admin">Admin</option>
                      <option id="user">User</option>
                    </select>
                </div>

                <div class="form-group">
                  <label for="name">Name</label>
                  <input 
                    type="name" 
                    name="name"
                    className="form-control" 
                    placeholder="Please Enter your Name"
                    onChange={(e) => this.setState({name: e.target.value})} 
                    id="name"
                    required 
                  />
                </div>
                    
                <div class="form-group">
                  <label for="email">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    className="form-control" 
                    placeholder="Please Enter your Email"
                    onChange={(e) => this.setState({email: e.target.value})} 
                    id="email"
                    required 
                  />
                </div>
                        
                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password" 
                    name="password"
                    className="form-control"
                    placeholder="Please Enter your Password" 
                    id="password"
                    onChange={(e) => this.setState({password: e.target.value})}
                    required
                  />
                </div>
                <button type="Submit" className="btn btn-success">Add User</button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}