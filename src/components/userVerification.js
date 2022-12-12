import React, {Component, useState, useEffect, useRef} from 'react';
import './table.css';
import emailjs from '@emailjs/browser';

export default class userVerification extends Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
        this.state = {
            id: "",
            datas: [],
            verify: false,
            loadVerification: false,
            history: true,
            email_sent: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.updateVerification = this.updateVerification.bind(this);
        this.verification = this.verification.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    updateVerification() {
        console.log("Verification updated");
        alert("All users verified");
        this.setState({
            loadVerification: false,
            history: true
        });
    }

    verification() {
        this.setState({verify: true})
        console.log("User verified");
    }
    sendEmail() {
        // emailjs.sendForm('service_22rl9vo', 'template_c9ueake', this.form.current, '5qCkTRANrxpqkVp3X')
        emailjs.sendForm('service_vx432h1', 'template_6wqy28f', this.form.current, '8qOMjr8qfQQ8WZWnz')
        .then((result) => {
            console.log(result.text);
            console.log("message sent to email");
            alert("User has been verified");
        }, (error) => {
            alert("Something went wrong");
        });
    };

    handleChange = (index) => (e) => {
        e.preventDefault();
        let datas = this.state;
        datas[index] = e.target.datas;
        this.setState({
            email_sent: this.state.datas[index].email,
            _id: this.state.datas[index]._id,
        })
        if(this.state.email_sent == this.state.datas[index].email) {
            console.log(this.state.datas[index].email);
            console.log('Email sent');
            this.verification();
            this.sendEmail();
            const message = 'User Email ' + [this.state.datas[index].email] + ' has verified';
            console.log(message);
            this.handleSubmit();
        } else {
            // console.log(error.message);
        }
        console.log('Update');
    };

    handleSubmit() {
        console.log("tester");
        let _id = this.state;
        const token = window.sessionStorage.getItem("token");
        fetch("https://smart-farm-backend.vercel.app/api/user/userVerify", {
            method: "PUT",
            crossdomain: true,
            headers: {
                "x-access-token": token,
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                _id
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            window.location.reload();
        });
    }

    componentDidMount() {
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
            this.setState({ 
                datas : data.filter((item) => {
                    return item.isVerified == false && item.role == 'user';
                }),
            })
            if(this.state.datas.length >= 1) {
                this.setState({
                    history: false,
                    loadVerification: true,
                })
            }
            console.log(data);
        });
    }

    componentDidUpdate(pP,pS,sS) {
        if(this.state.verify == true) {
            console.log(pS)
        }
    }

    // componentDidUpdate(nextProps, nextState) {
    //     if(this.state.email_sent != nextState.email_sent) {
    //         console.log(nextState);
    //     }
    // }

    // shouldComponentUpdate(nextState, nextProps) {
    //     if(this.state.email_sent != nextState.email_sent) {
    //         return true;
    //     }
    //     return false;
    // }

    displayData(datas){
        let table = '<table border="1">';
        table += `<tr><th>#</th><th>Name</th><th>Email</th></tr>`;
        datas.forEach((datas, index) => {
            table = table + `<tr>`;
            table = table + `<td>${index}</td>`;
            table = table + `<td>Name: ${datas.name}</td>`;
            table = table + `<td>Email: ${datas.email}</td>`;
            table += `</tr>`;
         });
         table += "</table>";
         document.getElementById("user-verification").innerHTML = table;
    }

    render() {
        return(
            <div className="outer-verification">
                <form onSubmit={this.handleChange}>
                    <h3>Verification User History</h3>
                    <>
                    {this.state.history ? (
                        <h2 className="history">No New User which is unverified</h2>
                    ):null}
                    </>
                    {this.state.loadVerification ? (
                    <>
                    <h6>Double klik to Verify</h6>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th id="name" className="th_name">Name</th>
                                    <th id="email" className="th_email">Email</th>
                                    <th id="isVerified" className="verification">
                                        Verification
                                    </th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                <>
                                    {this.state.datas.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td className="id">{index+1}</td>
                                                <td className="name">
                                                    <input
                                                        key={index}
                                                        type="text"
                                                        name="user_name"
                                                        value={item.name}
                                                        style={{
                                                            width: "100%",
                                                            backgroundColor: "none",
                                                            padding: 1,
                                                            border: "none",
                                                        }}
                                                    />
                                                </td>
                                                <td className="email">
                                                    <input
                                                        key={index}
                                                        type="email"
                                                        name="user_email"
                                                        value={item.email}
                                                        style={{
                                                            width: "100%",
                                                            backgroundColor:"none",
                                                            padding: 1,
                                                            border: "none",
                                                        }}
                                                    />
                                                </td>
                                                <td className="isVerified">
                                                    <input
                                                        key={index}
                                                        type="button"
                                                        value="verify"
                                                        onClick={this.handleChange(index)}
                                                        style={{
                                                            backgroundColor: "#2020ef",
                                                            width: "100%",
                                                            padding: 4,
                                                            color: "white",
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </>
                            </tbody>
                        </table>
                    </div>

                    <form ref={this.form} className="email_sent">
                        <input type="email" name='user_email' value={this.state.email_sent} />
                    </form>
                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn btn-success"
                            onClick={this.updateVerification}
                            style={{visibility: "hidden"}}
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