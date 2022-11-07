import React, { useEffect, useState } from 'react';
import * as SiIcons from "react-icons/si";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import './NavbarAlt.css';
import {Link} from 'react-router-dom';
import {SidebarDataAdmin} from './SidebarDataAdmin';
import { IconContext} from 'react-icons'
import { Outlet } from 'react-router-dom';
import LogoUMN from "../images/logo_umn.jpg";

function NavbarAlt() {
    let role = window.localStorage.getItem("role")
    const [sidebar, setSidebar] = useState(SidebarDataAdmin);

    return (
    <>
        <IconContext.Provider value={{color:'#fff'}}>
        
            <nav className='nav-menu'>
            <img src={LogoUMN} className="logo_UMN" />
                <ul className='nav-menu-items'>
                    {SidebarDataAdmin.map((item, index) => {
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
  };
export default NavbarAlt