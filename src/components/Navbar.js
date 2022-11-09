import React, { useEffect, useState } from 'react';
import * as SiIcons from "react-icons/si";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import './Navbarstyle.css';
import {Link} from 'react-router-dom';
import {SidebarDataAdmin} from './SidebarDataAdmin';
import { SidebarDataUser } from './SidebarDataUser';
import { SidebarDataLanding } from './SidebarDataLanding.';
import { IconContext} from 'react-icons'
import { Outlet } from 'react-router-dom';
import LogoUMN from "../images/logo_umn.png";

const Navbar = () => {
    let auth = window.localStorage.getItem("isAuth")
    let admin = window.localStorage.getItem("isAdmin")
    const [sidebar, setSidebar] = useState();
    const [sidebarData, setSidebarData] = useState(SidebarDataLanding);

    const fetchnavbar = () => {
        return(
            admin ? setSidebarData(SidebarDataAdmin) : setSidebarData(SidebarDataUser)
        )
    }
    
    const showSidebar = () => setSidebar(!sidebar);

    useEffect(() => {

        const checknavbar = () => {
            return (
                auth ? fetchnavbar() : setSidebarData(SidebarDataLanding)
            )
        }
        
        checknavbar()
    }, [])

    return (
    <>
        <IconContext.Provider value={{color:'#fff'}}>
            <div className='navbar'>
                <img src={LogoUMN} className="logo_UMN" />
                <Link to='#' className='menu-bars'>
                <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to="#" className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {sidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                    <li className='nav-logout' onClick={() => {window.localStorage.clear(); window.location.reload()}}><Link to="/"><AiIcons.AiOutlineLogout/><span>Logout</span></Link></li>
                </ul>
            </nav>
        </IconContext.Provider>
        <Outlet/>
    </>
  )
}

export default Navbar