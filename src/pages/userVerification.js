import React, {useState, useEffect, useRef} from 'react';
import '../components/table.css';
import emailjs from '@emailjs/browser';

const UserVerification = () => {
    let token = window.sessionStorage.getItem("token");
    const [id, setId] = useState("");
    const [datas, setDatas] = useState([]);
    const [verify, setVerify] = useState(false);
    const [loadVerification, setLoadVerification] = useState(false);
    const [history, setHistory] = useState(true);
    const [emailSent, setEmailSent] = useState("");
    const form = useRef();

    // fetch data
    useEffect(() => {
        const fetchData = async() => {
            fetch("https://smart-farm-backend.vercel.app/api/user/all", {
                method: "GET",
                headers: {
                    "x-access-token": token,
                    "Content-Type": 'application/json'
                }
            })
            .then((res) => res.json())
            .then(datas((data) => setDatas(data.filter((item) => {
                return item.isVerified == false && item.role == "user";
            }))))
                if(datas.length >= 1) {
                    setHistory(false);
                    setLoadVerification(true);
                }
                console.log(datas);
            }
        }
    );

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_22rl9vo', 'template_c9ueake', form.current, '5qCkTRANrxpqkVp3X')
        .then((result) => {
            console.log(result.text);
            console.log("message sent");
            alert("User has been verified");
        }, (error) => {
            console.log(error.text);
        });
    };

    const displayData = (datas) => {
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

    const verification = () => {
        setVerify(true);
        console.log("User verify");
    }

    const handleChange = (e, index) => {
        e.preventDefault();
        // let datas = datas;
        // datas[index] = e.target.datas;
        // setEmailSent = datas[index].email;
        // setId = datas[index].id;
        // console.log((datas[index]).email);
        console.log(e.target.datas[index].email);
        console.log("Email sent");
        const message = "User Email" + e.target.datas[index].email + "is verified";
        console.log(message);
        // sendEmail();
        verification();
        handleSubmit();
    }

    const handleSubmit = () => {
        console.log("test");
        // let _id = this.state;
        // const token = window.sessionStorage.getItem("token");
        // fetch("https://smart-farm-backend.vercel.app/api/user/userVerify", {
        //     method: "PUT",
        //     crossdomain: true,
        //     headers: {
        //         "x-access-token": token,
        //         "Content-Type": 'application/json'
        //     },
        //     body: JSON.stringify({
        //         _id
        //     }),
        // })
        // .then((res) => res.json())
        // .then((data) => {
        //     console.log(data);
        //     window.location.reload();
        // });
    }

    return(
        <div className="outer-verification">
            <form onSubmit={handleChange}>
                <h3>Verification User History</h3>
                <>
                {history ? (
                    <h2 className="history">No New User which is unverified</h2>
                ):null}
                </>
                {loadVerification ? (
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
                                    {datas.map((item, index) => {
                                        return(
                                            <tr key={index}>
                                                <td className="id">{index+1}</td>
                                                {/* <td className="name" name="user_name">{item.name}</td>
                                                <td className="email" name="user_email">{item.email}</td> */}
                                                <td className="name">
                                                    <input
                                                        key={index}
                                                        type="text"
                                                        name="user_name"
                                                        // value="name"
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
                                                        // value="email"
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
                                                        onClick={handleChange(index)}
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
                ):null}

            </form>
        </div>
    );
}

export default UserVerification;