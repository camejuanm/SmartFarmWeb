import React from 'react';
import "./Landing.css";
import KedairekaUMN from "../images/travel1.PNG";
import SmartfarmUMN from "../images/smartfarmUMN.JPG";
import Email from "../images/email.jpg";
import Phone from "../images/phone.jpg";

// crypto-browserify
const LandingPage = () => {

    return (
        <>  
            <div className="landing">
                <div class="border">
                    <h1>
                        Pengembangan Web App sebagai Media Pemantauan <br /> Sistem Tumbuh Tanaman Memanfaatkan IoT
                    </h1>
                </div>
                <div className="border_image">
                    <img src={KedairekaUMN} className="farm_image" />
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
