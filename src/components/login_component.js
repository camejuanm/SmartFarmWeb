import React, { Component } from "react";
import "./Authentication.css";

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
    console.log(email, password);
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
        if (!data.message) {
          if(data.isVerified == true) {
            alert("login successful");
            window.sessionStorage.setItem("token", data.accessToken);
            window.sessionStorage.setItem("isAuth", true)
            window.location.href = "/dashboard";
            if (data.role == "admin") {
              window.sessionStorage.setItem("isAdmin", true)
            }
          } else {
            alert("User unverified");
          }  
        } else {
          alert("invalid email or password");
        }
      });
  }
  render() {
    return (
      <>
        <div className="outer">
          <div className="outer-login">
            <div className="card">
              <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="mb-3">
                  <label for="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) => this.setState({ password: e.target.value })}
                  />
                </div>
                <p className="forgot-password text-right">
                  <a href="/forgot">Forgot password</a>?
                </p>

                <div className="mb-3">
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="rememberMe"
                    />
                    <label className="custom-control-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                </div>

                <div className="btnSubmit">
                  <button type="submit" className="btn btn-success">
                    Sign In
                  </button>
                </div>
                <p className="forgot-password text-right">
                  Don't have account yet? <a href="/sign-up">Sign Up</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}