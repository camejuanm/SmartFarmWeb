import React, { useEffect, useState, useContext } from 'react';
import { createContext } from 'react';
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as GrIcons from 'react-icons/gr';
import * as CgIcons from "react-icons/cg";
import './Navigation_style.css';
import {Link} from 'react-router-dom';
import {LoginTrue} from '../components/LoginTrue.js';
import { IconContext} from 'react-icons'
import { Outlet } from 'react-router-dom';
// import { Context } from './Context';
import { async } from '@firebase/util';

const Login = () => {
    // const { user, setUser } = useContext(Context);

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
                    {LoginTrue.map((item, index) => {
                        return (
                          <li key={index} className={item.cName}>
                            <Link to={item.path}>
                              {item.icon}
                              <span>{item.title}</span>
                            </Link>
                          </li>
                        )
                    })}
                    {/* <li>
                      <h2>Log Out</h2>
                      <pre>{JSON.stringify(user, null, 2)}</pre>
                      {user ? (
                        <button onClick = {(logout) => {
                          setUser(null);
                        }}
                        >
                          Logout
                        </button>
                      ) : (
                        <button
                        onClick={async() => {
                          const user = await Login();
                          setUser(user);
                        }}
                        >
                          Login
                        </button>
                      )}
                    </li> */}
                </ul>
            </nav>
        </IconContext.Provider>
        <Outlet/>
    </>
  )
}

export default Login