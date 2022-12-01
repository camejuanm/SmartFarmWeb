import React, { useEffect, useState } from 'react';
import * as SiIcons from "react-icons/si";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import './Navbarstyle.css';
import {Link} from 'react-router-dom';
import {SidebarDataAdmin} from './SidebarDataAdmin';
import { SidebarDataUser } from './SidebarDataUser';
import { SidebarLanding } from './SidebarLanding';
import { IconContext} from 'react-icons'
import { Outlet } from 'react-router-dom';
import LogoUMN from "../images/logo_umn.jpg";
import e from 'cors';

const Navbar = () => {
    let auth = window.sessionStorage.getItem("isAuth")
    let admin = window.sessionStorage.getItem("isAdmin")
    const [sidebar, setSidebar] = useState();
    const [sidebarData, setSidebarData] = useState(SidebarLanding);

    const fetchnavbar = () => {
        return(
            admin ? setSidebarData(SidebarDataAdmin) : setSidebarData(SidebarDataUser)
        )
    }
    
    const showSidebar = () => setSidebar(!sidebar);

    useEffect(() => {

        const checknavbar = () => {
            return (
                auth ? fetchnavbar() : setSidebarData(SidebarLanding)
            )
        }
        
        checknavbar()
    }, [])

    const keymap = (e) => {
        console.log(sidebarData[e.target.key].title)
    }

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
                                <button key={index} onClick={keymap}></button>
                            </li>
                        )
                    })}
                    <li className='nav-logout' onClick={() => {window.sessionStorage.clear(); window.location.reload()}}><Link to="/"><AiIcons.AiOutlineLogout/><span>Logout</span></Link></li>
                </ul>
            </nav>
        </IconContext.Provider>
        <Outlet/>
    </>
  )
}

export default Navbar