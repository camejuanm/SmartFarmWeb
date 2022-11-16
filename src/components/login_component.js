import React, { Component } from "react";
import "./reset.css";
import "./Authentication.css";
import { SidebarDataAdmin } from "./SidebarDataAdmin";
import { SidebarDataUser } from "./SidebarDataUser";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    // console.log(email, password);
    fetch("https://smart-farm-backend.vercel.app/api/user/signin", {
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
        console.log(data, "userRegister");
        console.log(data.statusCode)
        if (!data.message) {
          alert("login successful");
          window.sessionStorage.setItem("token", data.accessToken);
          window.sessionStorage.setItem("isAuth", true)
          window.location.href = "/dashboard";
          if (data.role == "admin") {
          window.sessionStorage.setItem("isAdmin",true)
          }
        } else {
          alert("invalid email or password");
        }
      });
  }
  render() {
    return (
      <div className="outer">
        <div className="card">
          <form onSubmit={this.handleSubmit}>
            <h3>Sign In</h3>

            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
            <p className="forgot-password text-right">
              Forgot <a href="/reset">password?</a>
            </p>

            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right">
              <a href="/sign-up">Sign Up</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}