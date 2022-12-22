import React from 'react';
import "./Landing.css";
import KedairekaUMN from "../images/smartfarmUMN.jpg";
import Email from "../images/email.jpg";
import Phone from "../images/phone.jpg";

// crypto-browserify
const LandingPage = () => {

    return (
        <>  
            <div className="landing">
                <div class="border">
                    <p class="title">
                        Pengembangan Web App Sebagai Media Dashboard <br /> Untuk Pemantauan Sistem Lahan Pertanian Memanfaatkan IoT
                    </p>
                </div>
                <div className="border_image">
                    <img src={KedairekaUMN} className="farm_image" />
                </div>
                <div className="border">
                    <div className="contact">
                        <h3>Hubungi Kami</h3>
                        <div className="additional-contact">
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
            </div>
        </>
    );
}

export default LandingPage;
