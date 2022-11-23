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
    if(email !== 'undefined' && password.length >= 6) {
      if(email !== "starwars@example.com" && email !== "eneos@example.com" && email !== "thenardhi2001@gmail.com") {
        fetch("http://localhost:5000/userData", {
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
          alert("User added successful");
          window.sessionStorage.setItem("token", data.accessToken);
          window.location.href="./dashboard";
        });
      } else {
        alert("User has already exists");
      }  
    }
    else {
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
                  <label for="role">Role:</label>
                  <p
                    className="form-control" 
                    id="role"
                    style={{fontWeight:"bold"}}
                    onChange={(e) => this.setState({ role: e.target.value })}
                  >User</p>
                </div>
                    
                <div class="form-group">
                  <label for="email">Email Address:</label>
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
                  <label for="password">Password:</label>
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