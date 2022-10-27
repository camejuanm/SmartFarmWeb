import React, {Component, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import "./Landing.css";
// import * as SiIcons from "react-icons/si";
// import * as AiIcons from "react-icons/ai";
// import * as FaIcons from "react-icons/fa";
import LogoUMN from "../images/logoUMN.png";
import FarmImage from "../images/travel1.PNG";
import Email from "../images/email.jpg";
import Phone from "../images/phone.jpg";
import Facebook from "../images/facebook.png";
import Navigation from '../navbar/Navigation';
import Login from '../navbar/Login';
// import { IconName } from 'react-icons/gi';
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const LandingPage = ({ imageSrc }) => {
    const [isLogin, SetIsLogin] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    useEffect(() => {
        let token = localStorage.getItem('token');
        if (token) {
            SetIsLogin(true);
        } else {
            SetIsLogin(false);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        SetIsLogin(false)
    };

    return (
        <div className="landing">
            <div className="main_menu">
                {isLogin ? (
                    <Login />
                ) : (
                    <Navigation />
            )}
                <img src={LogoUMN} className="landing_image" />
            </div>
            <div class="border">
                <h1>
                    Pengembangan Web App sebagai Media Pemantauan Sistem Tumbuh Tanaman Memanfaatkan IoT
                </h1>
            </div>
            <div className="border">
                <div className="visi_misi">
                    <h3>
                        Visi UMN:
                        <p className="visi">
                            Universitas Multimedia Nusantara menjadi perguruan tinggi unggul di bidang ICT, baik di tingkat nasional maupun international, yang menghasilkan lulusan berwawasan international yang berkompetisi tinggi di bidangnya (berkeahlian) yang disertai jiwa wirausaha serta berbudi pekerti luhur.
                        </p>
                    </h3>
                    <h3>
                        Misi UMN:
                        <p className="misi">
                            Turut serta mencerdaskan kehidupan bangsa dan memajukan kesejahteraan bangsa melalui upaya penyelenggaraan pendidikan tinggi dengan melaksanakan Tridarma Perguruan Tinggi (Pendidikan, Penelitian, dan Pengabdian Pada Masyarakat), untuk meningkatkan kualitas sumber daya manusia Indonesia.
                        </p>
                    </h3>
                </div>
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
                        <a class="fab fa-envelope-o">umn.ac.id</a>
                    </span>
                    <span>
                        <img src={Facebook} className="sosmed" alt="facebook" />
                        <a class="fab fa-facebook-f">Universitas Multimedia Nusantara</a>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;

// export default class LandingPage extends Component {
//     render() {
//         return(
//             <form onSubmit={this.onSubmit}>
//                 {/* <img src="logoUMN.png" /> */}
//                 <h3>Landing Page</h3>
                // <div className="mb-3">
                //     <div className="d-grid">
                //         <button type="submit" className="btn btn-link">
                //             <Link to="/sign-in" class="btn btn-primary">
                //                 Login
                //             </Link>
                //         </button>
                //     </div>
                //     <div className="d-grid">
                //         <button type="submit" className="btn btn-link">
                //             <Link to="/sign-up" class="btn btn-primary">
                //                 Register
                //             </Link>
                //         </button>
                //     </div>
                // </div>
//             </form>
//         );
//     }
// }
