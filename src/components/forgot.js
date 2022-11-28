import React, {Component} from 'react';
import "./Authentication.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default class Forgot extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            role: "Admin",
            email: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const { role, email } = this.state;
        console.log(role, email);
        fetch("http://localhost:5000/forgot-password", {
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
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data, "userRegister");
            alert("Message sent to email");
        });
    }

    render() {
        return(
            <>
                <div className="outer">
                    <div className="outer-forgot">
                        <div className="card">         
                            <form onSubmit={this.handleSubmit}>
                                <h3>Forgot Password</h3>
                                <div className="mb-3">
                                    <label for="role">Role</label>
                                    <p
                                        id="admin"
                                        className="form-control"
                                        onChange={(e) => this.setState({ role: e.target.value })}
                                        style={{fontWeight: "bold"}}
                                    >
                                        Admin
                                    </p>
                                </div>
                                <div className="mb-3">
                                    <label for="email">Email Address</label>
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
                </div>
            </>
        );
    }
}