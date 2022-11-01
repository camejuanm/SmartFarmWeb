import React, {Component, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import "./Landing.css";
import FarmImage from "../images/travel1.PNG";
import Email from "../images/email.jpg";
import Phone from "../images/phone.jpg";
import NavbarAlt from './NavbarAlt';

const LandingPage = ({ imageSrc }) => {

    return (
        <>
        <div className="landing">
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
        </>
        
    );
}

export default LandingPage;
