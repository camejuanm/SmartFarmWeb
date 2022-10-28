import React from 'react';
import * as CgIcons from 'react-icons/cg';
import * as GrIcons from 'react-icons/gr';
import * as AiIcons from 'react-icons/ai';

export const LoginTrue = [
    {
        title: 'Profile',
        path: '/userDetails',
        icon: <CgIcons.CgProfile/>,
        cName: 'nav-text'
    },
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <AiIcons.AiOutlineDashboard/>,
        cName: 'nav-text'
    },
    {
        title: 'Log Out',
        path: '/',
        icon: <GrIcons.GrLogout/>,
        cName: 'nav-text'
    }
]