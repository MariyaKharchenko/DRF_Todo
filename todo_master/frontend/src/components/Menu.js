import React from 'react';
import logo from '../logo.svg';
import {Link} from 'react-router-dom'



export default function Menu() {

    return(
        <nav class='top-menu'>
            <a class='navbar-logo' href='#'><img src='../logo.svg' alt='Этот логотип не загрузился'/></a>
            <ul class='menu-main'>
                <li><Link to='/'>Users</Link></li>
                <li><Link to='/projects'>Projects</Link></li>
                <li><Link to='/todo'>Todo</Link></li>
            </ul>
        </nav>
    )
}

