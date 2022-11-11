import React, { Component } from "react";
import "./user.css";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "User",
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { role, email, password } = this.state;
    console.log(role, email, password);
    fetch("https://localhost:5000/add-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        role,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userAdded");
        console.log(data.statusCode);
        window.location.href="/dashboard";
      });
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
                  <label for="role">Role:</label>
                  <p
                    className="form-control" 
                    id="role"
                    style={{fontWeight:"bold"}}
                    onChange={(e) => this.setState({ role: "e.target.value" })}
                  >User</p>
                </div>
                    
                <div class="form-group">
                  <label for="email">Email Address:</label>
                  <input 
                    type="email" 
                    name="email"
                    onChange={(e) => this.setState({email: e.target.value})}
                    className="form-control" 
                    placeholder="Please Enter your Email" 
                    id="email" 
                  />
                </div>
                        
                <div class="form-group">
                  <label for="password">Password:</label>
                  <input
                    type="password" 
                    name="password"
                    onChange={(e) => this.setState({password: e.target.value})}
                    className="form-control" 
                    placeholder="Please Enter your Password" 
                    id="password" 
                  />
                </div>
                <input type="submit" value="Add User" class="btn btn-success" />
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

// import React from 'react'
// import Navbar from '../components/Navbar';

// function AddUser() {
//   return (
//     <div className='adduser'>
//     <h1>AddUser</h1>
//     </div>
//   );
// }

// export default AddUser
