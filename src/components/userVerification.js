import React, {Component, useState, useEffect} from 'react';
// import './Authentication.css';
import './table.css';

export default class userVerification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            email: "",
            isVerified: false,
            datas: [],
            verify: false,
            verifyButton: true,
            updateVerification: true,
            history: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
        this.updateVerification = this.updateVerification.bind(this);
        this.verification = this.verification.bind(this);
    }

    updateVerification() {
        console.log("Verification updated");
        alert("All users verified");
        this.setState({
            isVerified: true,
            updateVerification: false,
            history: true
        });
    }

    verification() {
        console.log("User verify");
        this.setState({
            isVerified: true,
        })
    }
    verifyEmail(e) {
        this.setState({
            name: e.target.value,
            email: e.target.value
        }, function() {
            if(this.state.name !== "undefined" && this.state.email !== "undefined") {
                this.setState({ isVerified: true });
            }
        });
    }

    sendEmail() {
        alert("Email verified");
        this.setState({
            verify: true,
            isVerified: false,
        });
    }

    componentDidMount() {
        const { id, name, email } = this.state;
        console.log(id, name, email);
        const token = window.sessionStorage.getItem("token");
        fetch("https://smart-farm-backend.vercel.app/api/user/all", {
            method: "GET",
            headers: {
                "x-access-token": token,
                "Content-Type": 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {    
            this.setState({ datas : data.filter((item) => {
                return item.isVerified == false && item.role == 'user';
            })})
            console.log(data);
        });
    }

    componentWillUpdate(pP,pS,sS) {
        console.log(pS)
    }

    displayData(datas){
        let table = '<table border="1">';
        table += `<tr><th>#</th><th>Name</th><th>Email</th></tr>`;
        datas.forEach((datas, index) => {
            table = table + `<tr>`;
            table = table + `<td>${datas.id}</td>`;
            table = table + `<td>Name: ${datas.name}</td>`;
            table = table + `<td>Email: ${datas.email}</td>`;
            table += `</tr>`;
         });
         table += "</table>";
         document.getElementById("user-verification").innerHTML = table;
     }

    handleSubmit(e) {
        e.preventDefault();
        if(this.state.verify) {
            this.componentDidMount();
        } else {
            alert("Please verify new user");
        }
    }

    render() {
        return(
            <div className="outer-verification">
                <form onSubmit={this.handleSubmit}>
                    <h3>Verification User History</h3>
                    <>
                    {this.state.history ? (
                        <h2 className="history">No New User which is unverified</h2>
                    ):null}
                    </>
                    {this.state.updateVerification ? (
                    <>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th id="name">Name</th>
                                    <th id="email">Email</th>
                                    <th id="isVerified">Verification Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <>
                                    {this.state.datas.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="id">{index+1}</td>
                                                <td className="name">{item.name}</td>
                                                <td className="email">{item.email}</td>
                                                 
                                                <td className="isVerified">
                                                    {this.state.verifyButton ? (
                                                    <input
                                                        type="button"
                                                        value="verify"
                                                        onClick={this.verification}
                                                        style={{
                                                            backgroundColor: "#2b30ef",
                                                            width: "100%",
                                                            padding: 4,
                                                            color: "white",
                                                            border:"none",
                                                        }}
                                                    />
                                                    ):null}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                            </tbody>
                        </table>
                    </div>
                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn btn-success"
                            onClick={this.updateVerification}
                        >
                            Verify All User
                        </button>
                    </div>
                    </>
                    ):null}
                </form>
            </div>
        );
    }
}