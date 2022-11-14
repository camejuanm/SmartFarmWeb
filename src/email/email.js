import React, { Component, useState } from "react";
import app from "../components/firebase_config";
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getAuth, RecaptchaVerifier, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { isAdmin } from "@firebase/util";
import "../components/Authentication.css";

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
    const email = this.state.email;
    const actionCodeSettings = {
      url: 'https://www.example.com/finishSignUp?cartId=1234',
      // This must be true.
      handleCodeInApp: true,
      iOS: {
        bundleId: 'com.example.ios'
      },
      android: {
        packageName: 'com.example.android',
        installApp: true,
        minimumVersion: '12'
      },
      dynamicLinkDomain: 'example.page.link'
    };
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem('emailForSignIn', email);
      // ...
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          // User opened the link on a different device. To prevent session fixation
          // attacks, ask the user to provide the associated email again. For example:
          email = window.prompt('Please provide your email for confirmation');
        }
        // The client SDK will parse the code from the link for you.
        signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            // Clear email from storage.
            window.localStorage.removeItem('emailForSignIn');
            alert('otp sent');
            // You can access the new user via result.user
            // Additional user info profile not available via:
            // result.additionalUserInfo.profile == null
            // You can check if the user is new or existing:
            // result.additionalUserInfo.isNewUser
          })
          .catch((error) => {
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
          });
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // invalid email address
    });
  }

  //code will send via SMS about 5 minutes since verifyButton clicked
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
      if(this.state.mobile.length !== 0) {
        this.setState({
          verifyButton: true,
        });
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.verified) {
      const { name, role, email, password } = this.state;
      console.log(name, role, email, password);
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
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "userRegister");
          alert("User has been registered");
          window.location.href="./sign-in";
        });
    } else {
      alert("Please Verify Email");
    }
    
  }
  render() {
    return (
      <>
        <div className="outer">
          <div className="outer-e-register">
            <div className="card">
              <form onSubmit={this.handleSubmit}>
                <h3>Email Verification Code</h3>
                <div id="recaptcha-container"></div>
                <div className="mb-3">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    onChange={(e) => this.setState({ name: e.target.value })}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label for="role">Role</label>
                  <br />
                  <select
                    id="role"
                    className="btn btn-primary"
                    placeholder="Select Role"
                    onChange={(e) => this.setState({ role: e.target.value })}
                  >
                    
                    <option></option>
                    <option id="admin">Admin</option>
                    <option id="user">User</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label for="email">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
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
                  <label for="otp">OTP</label>
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
                  <label for="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    minLength = {6}
                    onChange={(e) => this.setState({ password: e.target.value })}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button 
                    type="submit" 
                    className="btn btn-success" 
                  >
                    Sign Up
                  </button>
                </div>
                <p className="forgot-password text-right">
                  Already registered? <a href="/sign-in">sign in?</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}