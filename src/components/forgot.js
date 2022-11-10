import React, {Component} from 'react';
import "./Authentication.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Forgot extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { email } = this.state;
        console.log(email);
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
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userRegister");
            alert("password changes");
        });
    }

    render() {
        return(
            <>
                <div className="outer">
                    <div className="card">         
                        <form onSubmit={this.handleSubmit}>
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
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}