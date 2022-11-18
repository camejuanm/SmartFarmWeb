import React, {Component} from 'react';
import './Authentication.css';
import './table.css';

export default class newUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            email: "",
            isVerified: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.verifyEmail = this.verifyEmail.bind(this);
    }


    verifyEmail() {
        if(this.state.id >=1 && this.state.name!== "undefined" && this.state.email!== "undefined") {
            this.setState({ isVerified: true });
        }   
    }

    handleSubmit(e) {
        e.preventDefault();
        const { id, name, email } = this.state;
        console.log(id, name, email);
        if(this.state.isVerified) {
            console.log("userVerify");
            alert("Verification Done");
            window.location.href="/sign-up";
        } else {
            alert("User unverified");
        }
    }

    render() {
        return(
            <div className="outer">
                <form onSubmit={this.handleSubmit}>
                    <h3>Verification User History</h3>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th id="id">Id</th>
                                    <th id="name">Name</th>
                                    <th id="email">Email</th>
                                    <th id="isVerified">Verified</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr onChange={(e) => this.verifyEmail(e)}>
                                    <td className="id">
                                        <input
                                            type="number"
                                            id="id"
                                            className="form-control"
                                            onChange={(e) => this.setState({ id: e.target.value })}
                                        />
                                    </td>
                                    <td className="name">
                                        <input
                                            type="text"
                                            id="name"
                                            className="form-control"
                                            onChange={(e) => this.setState({ name: e.target.value })}
                                        />
                                    </td>
                                    <td className="email">
                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control"
                                            onChange={(e) => this.setState({ email: e.target.value })}
                                        />
                                    </td>
                                    <td className="isVerified">
                                        {this.state.isVerified? (
                                            <input
                                                type="button"
                                                value="verify"
                                                className="form-control"
                                                style={{
                                                    backgroundColor: "blue",
                                                    width: "100%",
                                                    padding: 8,
                                                    color: "white",
                                                    border:"none",
                                                }}
                                            />
                                        ):null}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="d-grid">
                    <button
                        type="submit" 
                        className="btn btn-success"
                    >
                        Sign Up
                    </button>
                </div>
                </form>
            </div>
        );
    }
}