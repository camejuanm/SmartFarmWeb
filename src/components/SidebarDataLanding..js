import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as GrIcons from 'react-icons/gr';
import * as GiIcons from 'react-icons/gi';

export const SidebarDataLanding = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiOutlineHome/>,
        cName: 'nav-text'
    },
    {
        title: 'Login',
        path: '/sign-in',
        icon: <AiIcons.AiOutlineLogin/>,
        cName: 'nav-text'
    }, {
        title: 'Register',
        path: '/sign-up ',
        icon: <FaIcons.FaRegUser/>,
        cName: 'nav-text'
    }
]