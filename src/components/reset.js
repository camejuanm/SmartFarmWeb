// import { sendPasswordResetEmail } from 'firebase/auth';
import React, {Component} from 'react';
import "./reset.css";
import "./Authentication.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default class Reset extends Component {
    
//     constructor(props) {
//         super(props);
//         this.state = {
//             email: "",
//             password: "",
//             // cpassword: "",
//         };
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleSubmit(e) {
//         e.preventDefault();
//         const { email, password } = this.state;
//         console.log(email, password);
//         fetch("http://localhost:5000/forgot-password", {
//           method: "POST",
//           crossDomain: true,
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             "Access-Control-Allow-Origin": "*",
//           },
//           body: JSON.stringify({
//             email,
//             password,
//           }),
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             console.log(data, "userRegister");
//             if (data.status == "ok") {
//               alert("password changes");
//               window.localStorage.setItem("token", data.data);
//               window.location.href = "./sign-in";
//             } else {
//               alert("Invalid password");
//             }
//         });
//     }

//     render() {
//         return(            
//             <form onSubmit={this.onSubmit}>
//                 <h3>Forgot Password</h3>

//                 <div className="mb-3">
//                     <label>Email Address</label>
//                     <input
//                         type="email"
//                         className="form-control"
//                         placeholder="Enter email"
//                         onChange={(e) => this.setState({ email: e.target.value })}
//                     />
//                 </div>

//                 <div className="mb-3">
//                     <label>New Password</label>
//                     <input
//                         type="password"
//                         className="form-control"
//                         placeholder="New Password"
//                         onChange={(e) => this.setState({ password: e.target.value })}
//                     />
//                 </div>

//                 {/* <div className="mb-3">
//                     <label>Confirm Password</label>
//                     <input
//                         type="password"
//                         className="form-control"
//                         placeholder="Confirm Password"
//                         onChange={(e) => this.setState({ cpassword: e.target.value })}
//                         required
//                     />
//                 </div> */}
//                 <div className="d-grid">
//                     <button type="submit" className="btn btn-primary">
//                         Submit
//                     </button>
//                 </div>  
//             </form>
//         );
//     }
// }

// <div className="app">
            //     <div>
            //         <h2>Forgot Password</h2>
            //     </div>
            //     <div>
            //         <label htmlFor="">Email:</label>
            //     </div>
            //     <input
            //         type="email"
            //         placeholder="email address"
            //         value={email}
            //         onChange={handleOnChange}
            //     />
            //     <button onClick={emailValidation}>Check</button>
            // </div>

{/* <button type="submit" className="btn btn-primary">
                        <a href="/sign-up" style={{
                            color:"#f0f0f0",
                            display: "transparent",
                            border: "none",
                        }}>
                            Submit
                        </a>
                    </button> */}


// emailValidation = () => {
    //     // const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z]);
    //     const regEx = 56;
    //     if(regEx.test(email)) {
    //         console.log("email is Valid");
    //     } else if(!regEx.test(email) && email != "") {
    //         console.log("Email is Not Valid");
    //     } else {
    //         alert("");
    //     }
    // };
    // handleSubmit(e) {
    //     e.preventDefault();
    //     const { email, cpassword } = this.state;
    //     console.log(email, cpassword);
    //     fetch("http://localhost:5000/forgot-password", {
    //         method: "POST",
    //         crossDomain: true,
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json",
    //             "Access-Control-Allow-Origin": "*",
    //         },
    //         body: JSON.stringify({
    //             email,
    //             cpassword
    //         }),
    //     })
    //     .then((res) => res.json())
    //     .then((data) => {
    //         console.log(data, "userRegister");
    //         // alert(data.status);
    //         if(data.status == "ok") {
    //             alert("password changes successful");
    //             window.localStorage.setItem("token", data.data);
    //             window.location.href = "./sign-up";
    //         } else {
    //             alert('Please fill in email or new password and confirm password are not match');
    //         }
    //     });
    // }


    // import './App.css';

// function Reset() {
//     const [email, setEmail] = useState("");
//         return(
//             <div className="app">
//                 <div>
//                     <h2>Forgot Password</h2>
//                 </div>
//                 <div>
//                     <label htmlFor="">Email:</label>
//                     <input type="email" placeholder="email" value={email} />
//                 </div>
//             </div>
//         );
// }

// onResetPassword() {
    //     alert("password changes successful");
    //     window.location.href = "./sign-in";   
    // }



// import React, { Component } from "react";
// import "./Authentication.css";

export default class Reset extends Component {

  constructor() {
    super();
    this.state = {
      input: {},
      msg: {}
    };
    this.confirmPassword = this.confirmPassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  confirmPassword(e) {
    var inputPassword = this.state.input;
    inputPassword[e.target.name] = e.target.value;
    this.setState({
      inputPassword
    });
  };

  validation() {
    var msg = {};
    if(this.state.input["newPassword"] != this.state.input["confirmPassword"]) {
      msg["newPassword"] = "Password is not match";
      alert("Password is not match");
    }
    else {
      msg["confirmPassword"] = "Password is match";
      window.location.href="/sign-in";
    }
    this.setState({
      msg: msg
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, newPassword, confirmPassword } = this.state;
    console.log(email, newPassword, confirmPassword);
    fetch("http://localhost:5000/forgot-password", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        newPassword,
        confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          alert("password changes successful");
          window.localStorage.setItem("token", data.data);
          window.location.href = "./dashboard";
        } else {
          alert("invalid password");
        }
      });
    if(this.validation()) {
      var input = {};
      input["newPassword"] = "";
      input["confirmPassword"]="";
    }
  }

  render() {
    return(
      <div className="outer">
        <div className="card">
          <center>
            <h2>Forgot Password</h2>
          </center>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              Email:
              <input type="email" className="form-control" placeholder="Enter email" required />
            </div>
            <div className="form-group">
              New Password:
              <input type="password" className="form-control" name="newPassword" minLength ={6} maxLength={25}  value={this.state.input.newPassword} onChange={this.confirmPassword} placeholder="Enter new password" required />
            </div>
            <div className="form-group">
              Confirm Password:
              <input type="password" className="form-control" name="confirmPassword" minLength={6} maxLength={25} value={this.state.input.confirmPassword} placeholder="Enter confirm password" required />
            </div>
            <div className="text-danger">
              {this.state.msg.newPassword}
            </div>
            <div className="text-success">
              {this.state.msg.confirmPassword}
            </div>
            <input type="submit" className="btn btn-success" value="Submit" />
          </form>
        </div>
      </div>
    );
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     email: "",
  //     npassword: "",
  //     cpassword: "",
  //   };
  //   this.handleSubmit = this.handleSubmit.bind(this);
  // }

  // checkPassword() {
  //   let npassword = document.getElementById("password").value;
  //   let cpassword = document.getElementById("cpassword").value;
  //   console.log(npassword, cpassword);
  //   // let message = document.getElementById("message");

  //   if(npassword.length >=5) {
  //       if(npassword == cpassword) {
  //           alert("Password match");
  //       } else {
  //           alert("Password did not match");
  //       }
  //   }
  // }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   const { email, npassword, cpassword } = this.state;
  //   console.log(email, npassword, cpassword);
  //   fetch("http://localhost:5000/login-user", {
  //     method: "POST",
  //     crossDomain: true,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //     body: JSON.stringify({
  //       email,
  //       npassword,
  //       cpassword,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data, "userRegister");
  //       if (data.status == "ok") {
  //         alert("password changes successful");
  //         window.localStorage.setItem("token", data.data);
  //         window.location.href = "./sign-in";
  //       } else {
  //         alert("invalid password");
  //       }
  //     });
  // }
  // render() {
  //   return (
  //     <form onSubmit={this.handleSubmit}>
  //       <h3>Forgot Password</h3>

  //       <div className="mb-3">
  //         <label>Email address</label>
  //         <input
  //           type="email"
  //           className="form-control"
  //           placeholder="Enter email"
  //           onChange={(e) => this.setState({ email: e.target.value })}
  //         />
  //       </div>

  //       <div className="mb-3">
  //         <label>New Password</label>
  //         <input
  //           type="password"
  //           className="form-control"
  //           placeholder="New password"
  //           onChange={(e) => this.setState({ npassword: e.target.value })}
  //         />
  //       </div>

  //       <div className="mb-3">
  //         <label>Confirm Password</label>
  //         <input
  //           type="password"
  //           className="form-control"
  //           placeholder="Confirm password"
  //           onChange={(e) => this.setState({ cpassword: e.target.value })}
  //         />
  //       </div>

  //       <div className="d-grid">
  //         <button 
  //         type="submit" 
  //         className="btn btn-primary"
  //         onClick={this.checkPassword}
  //         >
  //           Submit
  //         </button>
  //       </div>
  //       <p className="forgot-password text-right">
  //         <a href="/sign-up">Sign Up</a>
  //       </p>
  //     </form>
  //   );
  // }
}