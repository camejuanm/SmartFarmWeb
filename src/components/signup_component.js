import React, { Component, useState, useRef } from "react";
import app from "./firebase_config";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { isAdmin } from "@firebase/util";
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import "./Authentication.css";

const auth = getAuth(app);

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.state = {
      name: "",
      email: "",
      mobile: "",
      password: "",
      verifyButton: false,
      verifyOtp: false,
      otp: "",
      verified: false,
      confirm: false,
    };
    this.callBoth = this.callBoth.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
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
      if(this.state.mobile.length == 10) {
        this.setState({
          verifyButton: true,
        });
      }
    });
  }

  callBoth(e) {
    this.sendEmail();
    this.handleSubmit(e);  
  }

  sendEmail() {
    if(this.state.verified) {
      emailjs.sendForm('service_demzptr', 'template_uiwql3f', this.form.current, 'q0GDn7v-mwN_8M8v3')
      .then((result) => {
          console.log(result.text);
          console.log("message sent");
          alert("message has sent to email");
          this.setState({ validate: true });
      }, (error) => {
          // console.log(error.text);
      });
    } else {
      // alert("Please Verify Mobile");
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.verified) {
      const { name, email, mobile, password } = this.state;
      console.log(name, email, mobile, password);
      if(name !== undefined && email !== undefined && password.length >= 6) {
        fetch("https://smart-farm-backend.vercel.app/api/user/signup", {
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
            mobile,
            password,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userRegister");
            if(data.message == "New user successfully registered") {
              alert("User has been registered");
              window.location.href="./sign-in";
            } else {
              alert("User has already exists");
            }
          });
      } else {
        alert("Please complete filling in the form");
      }  
    } else {
      alert("Please Verify Mobile");
    }
  }
  render() {
    return (
      <>
        <div className="outer">
          <div className="outer-register">
            <div className="card">
                <h3>Sign Up</h3>
                <form ref={this.form} onSubmit={this.handleSubmit}>
                  <div id="recaptcha-container"></div>
                  <div className="mb-3">
                    <label for="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="user_name"
                      className="form-control"
                      placeholder="Enter name"
                      onChange={(e) => this.setState({ name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label for="email">Email address</label>
                    <input
                      type="email"
                      id="email"
                      name="user_email"
                      className="form-control"
                      placeholder="Enter email"
                      onChange={(e) => this.setState({ email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label for="mobile">Mobile Phone</label>
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
                        padding: 5,
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
                      id="password"
                      className="form-control"
                      placeholder="Enter password"
                      onChange={(e) => this.setState({ password: e.target.value })}
                      required
                    />
                  </div>

                  <div className="btnSubmit">
                    <input
                      type="button"
                      value="Sign Up"
                      onClick={this.callBoth}
                      style={{
                        backgroundColor: "green",
                        width: "100%",
                        padding: 8,
                        color: "white",
                        border:"none",
                      }}
                    />
                  </div>
                </form>
                <p className="forgot-password text-right">
                  Already registered? <a href="/sign-in">sign in?</a>
                </p>
            </div>
          </div>
        </div>
      </>
    );
  }
}
