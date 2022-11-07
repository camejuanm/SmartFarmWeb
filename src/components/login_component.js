import React, { Component } from "react";
import "./Authentication.css";
import Authentication from '../navbar/Authentication';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {},
      errors: {},
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
        console.log(data.statusCode)
        if (!data.message) {
          alert("login successful");
          window.localStorage.setItem("token", data.accessToken);
          window.location.href = "./dashboard";
        } else {
          alert("invalid email or password");
        }
      });
  }
  validate() {
    let input = this.state.input;
    let errors = {};
    let isValid = true;

    if (!input["email"]) {
      isValid = false;
      errors["email"] = "Please enter your email Address.";
    }

    if (typeof input["email"] !== "undefined") {
        
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(input["email"])) {
          isValid = false;
          errors["email"] = "Please enter valid email address.";
        }
    }

    if (!input["password"]) {
        isValid = false;
        errors["password"] = "Please enter your password.";
    }

    this.setState({
      errors: errors
    });
    return isValid;
  }
  render() {
    return (
      <>
        <Authentication />
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
                  value={this.state.input.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
                <div className="text-danger">{this.state.errors.email}</div>
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value = {this.state.input.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
                <div className="text-danger">{this.state.errors.password}</div>
              </div>
              <p className="forgot-password text-right">
                <a href="/forgot">Forgot password</a>?
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
      </>
    );
  }
}