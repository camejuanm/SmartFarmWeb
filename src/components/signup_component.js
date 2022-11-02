import React, { Component } from "react";
import app from "./firebase_config";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Dropdown from '../dropdown/Dropdown';

const auth = getAuth(app);

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      role: "",
      mobile: "",
      password: "",
      verifyButton: false,
      verifyOtp: false,
      otp: "",
      verified: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onSignInSubmit = this.onSignInSubmit.bind(this);
    this.verifyCode = this.verifyCode.bind(this);
  }

  onCaptchVerify() {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        this.onSignInSubmit();
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // ...
      },
    }, auth);
  }

  onSignInSubmit() {
    this.onCaptchVerify();
    const phoneNumber = "+62" + this.state.mobile;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      // SMS sent. Prompt user to type the code from the message, then sign the
      // user in with confirmationResult.confirm(code).
      window.confirmationResult = confirmationResult;
      alert("otp sent");
      this.setState({ verifyOtp: true });
      // ...
    }).catch((error) => {
      // Error; SMS not sent
      // ...
    });
  }

  verifyCode() {
    window.confirmationResult
    .confirm(this.state.otp)
    .then((result) => {
      // User signed in successfully.
      const user = result.user;
      console.log(user);
      alert("Verification Done");
      this.setState({
        verified: true,
        verifyOtp: false,
      });
    }).catch((error) => {
      alert("Invalid Otp");
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }

  changeMobile(e) {
    this.setState({ mobile: e.target.value }, function() {
      if(this.state.mobile.length == 10) {
        this.setState({
          verifyButton: true,
        });
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.verified) {
      const { name, email, role, mobile, password } = this.state;
      console.log(name, email, role, mobile, password);
      fetch("http://localhost:5000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name,
          email,
          role,
          mobile,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          alert("User has been registered");
        });
    } else {
      alert("Please Verify Mobile");
    }
    
  }
  render() {
    return (
      <div className="outer">
        <div className="card">
          <form onSubmit={this.handleSubmit}>
            <h3>Sign Up</h3>
            <div id="recaptcha-container"></div>
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter name"
                onChange={(e) => this.setState({ name: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => this.setState({ email: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label>Role</label>
              <Dropdown />
            </div>

            <div className="mb-3">
              <label>Mobile Phone</label>
              <input
                type="number"
                className="form-control"
                placeholder="(+62) Enter mobile"
                onChange={(e) => this.changeMobile(e)}
              />
              {this.state.verifyButton? (
              <input
                type="button"
                value= {this.state.verified ? "verified": "verify"}
                onClick={this.onSignInSubmit}
                style={{
                  backgroundColor: "blue",
                  width: "100%",
                  padding: 8,
                  color: "white",
                  border:"none",
                }}
              />
              ):null}
            </div>

            {this.state.verifyOtp? (
            <div className="mb-3">
              <label>OTP</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter OTP"
                onChange={(e) => this.setState({ otp: e.target.value })}
              />
              <input
                type="button"
                value="OTP"
                onClick={this.verifyCode}
                style={{
                  backgroundColor: "blue",
                  width: "100%",
                  padding: 5,
                  color: "white",
                  border:"none",
                }}
              />
            </div>
            ) :null}

            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                minLength = {6}
                maxLength = {25}
                onChange={(e) => this.setState({ password: e.target.value })}
                required
              />
            </div>

            <div className="d-grid">
              <button 
                type="submit" 
                className="btn btn-primary" 
              >
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered <a href="/sign-in">sign in?</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
