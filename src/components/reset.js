import React, {Component} from 'react';
import "./reset.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Reset extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            cpassword: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email, password, cpassword } = this.state;
        console.log(email, password, cpassword);
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
            password,
            cpassword
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userRegister");
            if (data.status == "ok") {
              alert("password changes");
              window.localStorage.setItem("token", data.data);
              window.location.href = "./sign-in";
            } else {
              alert("Invalid password");
            }
        });
    }

    render() {
        return(
          <div className="outer">            
            <form onSubmit={this.onSubmit}>
                <h3>Forgot Password</h3>
                <div className="mb-3">
                    <label>Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        onChange={(e) => this.setState({ email: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label>New Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="New Password"
                        onChange={(e) => this.setState({ password: e.target.value })}
                    />
                </div>

                <div className="mb-3">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        onChange={(e) => this.setState({ cpassword: e.target.value })}
                        required
                    />
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-success">
                        Submit
                    </button>
                </div>  
            </form>
          </div>
        );
    }
}