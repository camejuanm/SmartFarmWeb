import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as GrIcons from 'react-icons/gr';
import * as GiIcons from 'react-icons/gi';

export const SidebarDataAdmin = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <AiIcons.AiOutlineDashboard/>,
        cName: 'nav-text'
    },
    {
        title: 'Gateway',
        path: '/gateway',
        icon: <GiIcons.GiDoorway/>,
        cName: 'nav-text'
    },
    {
        title: 'Generate Token',
        path: '/token',
        icon: <GiIcons.GiToken/>,
        cName: 'nav-text'
    },
    {
        title: 'Add New User',
        path: '/adduser',
        icon: <AiIcons.AiOutlineUserAdd/>,
        cName: 'nav-text'
    }
]