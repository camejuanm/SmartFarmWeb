import React, { useEffect, useState } from 'react';
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as CgIcons from "react-icons/cg";
import './Navigation_style.css';
import {Link} from 'react-router-dom';
import {LandingData} from '../components/LandingData';
import { IconContext} from 'react-icons'
import { Outlet } from 'react-router-dom';

const Navigation = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
    <>
        <IconContext.Provider value={{color:'#fff'}}>
            <div className='navigation_bar'>
                <Link to='#' className='menu-bars'>
                  <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
            </div>
            <nav className={sidebar ? 'navigation-menu active' : 'navigation-menu'}>
                <ul className='navigation-menu-items' onClick={showSidebar}>
                    <li className='navigationbar-toggle'>
                        <Link to="#" className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {LandingData.map((item, index) => {
                        return (
                          <li key={index} className={item.cName}>
                            <Link to={item.path}>
                              {item.icon}
                              <span>{item.title}</span>
                            </Link>
                          </li>
                        )
                    })}
                </ul>
            </nav>
        </IconContext.Provider>
        <Outlet/>
    </>
  )
}

export default Navigation