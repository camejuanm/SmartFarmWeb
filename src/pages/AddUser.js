import React, { Component } from "react";
import "./user.css";
import { getAuth, linkWithCredential, EmailAuthProvider } from "firebase/auth";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(e) {
  //   let input = this.state.input;
  //   input[e.target.name] = e.target.value;

  //   this.setState({
  //       input
  //   });
  // }

  handleSubmit(e) {
    e.preventDefault();
    const role = "user";
    const { email, password } = this.state;
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
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userAdded");
        window.location.href="/dashboard";
        // console.log(data, "userAdded");
        // console.log(data.statusCode);
        // if (data.message) {
        //   alert("Add user successful. Email will send in 24 hours.");
        //   window.localStorage.setItem("token", data.accessToken);
        //   window.localStorage.setItem("isAuth", true)
        //   window.location.href = "/dashboard";
        //   if (data.role == "admin") {
        //     window.localStorage.setItem("isAdmin",true)
        //   }
        // } else {
        //   alert("User has already exists");
        // }
      });
  }
  render() {
    return (
      <>
        <div className="outer-border">
          <div className="card">
            <form onSubmit={this.handleSubmit}>
              <div class="form-group">
                <label for="role">Role:</label>
                <input
                  className="form-control" 
                  id="role"
                  value="user"
                  onChange={(e) => this.setState({ role: e.target.value })}
                />
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
