import React, {Component, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import "./Landing.css";
// import * as SiIcons from "react-icons/si";
// import * as AiIcons from "react-icons/ai";
// import * as FaIcons from "react-icons/fa";
import FarmImage from "../images/travel1.PNG";
import Email from "../images/email.jpg";
import Phone from "../images/phone.jpg";
import Facebook from "../images/facebook.png";
// import Dashboard from '../pages/Dashboard'
// import { IconName } from 'react-icons/gi';
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const LandingPage = ({ imageSrc }) => {
    // const [sidebar, setSidebar] = useState(false);
    // const showSidebar = () => setSidebar(!sidebar);
    // const [isLogin, SetIsLogin] = useState(false);

    // useEffect(() => {
    //     let token = localStorage.getItem('token');
    //     if (token) {
    //         SetIsLogin(true);
    //     } else {
    //         SetIsLogin(false);
    //     }
    // }, []);

    // const logout = () => {
    //     localStorage.removeItem('token');
    //     SetIsLogin(false)
    // };

    return (
        <div className="landing">
            {/* <div className="main_menu">
                {isLogin ? (
                //     <button
                //     onClick={() => {
                //       // call logout
                //       SetIsLogin(null);
                //     }}
                //   >
                //     logout
                //   </button>
                    <Login />
                ) : (
                    // <button
                    //     onClick={async () => {
                    //     const user = await Dashboard();
                    //     SetIsLogin(isLogin);
                    // }}
                    // >
                    //     login
                    // </button>
                    <Navigation />
            )}
                <img src={LogoUMN} className="landing_image" />
            </div> */}
            <div class="border">
                <h1>
                    Pengembangan Web App sebagai Media Pemantauan Sistem Tumbuh Tanaman Memanfaatkan IoT
                </h1>
            </div>
            <div className="border_image">
                <img src={FarmImage} className="farm_image" />
            </div>
            <div className="border">
                <div className="contact">
                    <h3>Hubungi Kami</h3>
                    <span>
                        <img src={Phone} className="sosmed" alt="nomorHP" />
                        <a class="fab fa-phone">5422 0808</a>
                    </span>
                    <span>
                        <img src={Email} className="sosmed" alt="email" />
                        <a class="fab fa-envelope-o">fti@umn.ac.id</a>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
