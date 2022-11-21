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
            status: "unverified",
            isVerified: false,
            datas: "",
            verify: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
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
            status: "verified",
        });
    }

    componentDidMount() {
        const { id, name, email } = this.state;
        console.log(id, name, email);
        const token = window.localStorage.getItem("token");
        fetch("https://smart-farm-backend.vercel.app/api/user/all", {
            method: "GET",
            headers: {
                "x-access-token": token,
                "Content-Type": 'application/json'
            }
        })
        .then((res) => res.json())
        .then((data) => {    
            this.setState({ datas : data })
            console.log(data);
        });
    }

    componentWillUpdate(pP,pS,sS) {
        console.log(pS)
    }

    displayData(datas){
        let table = '<table border="1">';
        table += `<tr><th>ID</th><th>Name</th><th>Rank</th></tr>`;
        datas.forEach((datas, index) => {
            table = table + `<tr>`;
            table = table + `<td>Title: ${datas.name}</td>`;
            table = table + `<td>Title: ${datas.email}</td>`;
            table = table + `<td>Title: ${datas.id}</td>`;
            table += `</tr>`;
         });
         table += "</table>";
         document.getElementById("movies-list").innerHTML = table;
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
                                    <th id="status">Status</th>
                                    <th id="isVerified">Verification Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>633e9f56e1b073cf48d9f81c</td>
                                    <td>Anakin</td>
                                    <td>starwars@example.com</td>
                                    <td>verified</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td className="id">
                                        <input
                                            type="text"
                                            id="id"
                                            className="form-control"
                                            onChange={(e) => this.setState({ id: e.target.value })}
                                            unique
                                        />
                                    </td>
                                    <td className="name">
                                        <input
                                            type="text"
                                            id="name"
                                            className="form-control"
                                            onChange={(e) => {this.verifyEmail(e)}}
                                        />
                                    </td>
                                    <td className="email">
                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control"
                                            onChange={(e) => {this.verifyEmail(e)}}
                                        />
                                    </td>
                                    <td className="status">{this.state.status}</td>
                                    <td className="isVerified">
                                        {this.state.isVerified? (
                                            <input
                                                type="button"
                                                value={this.state.verify ? "verified" : "verify"}
                                                className="form-control"
                                                onClick={this.sendEmail}
                                                style={{
                                                    backgroundColor: "#4040db",
                                                    width: "100%",
                                                    padding: 5,
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
                        Verify User
                    </button>
                </div>
                </form>
            </div>
        );
    }
}