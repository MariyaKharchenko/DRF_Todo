import React from 'react';
import logo from '../logo.svg';
import {Link} from 'react-router-dom'



export default function Menu() {

    return(
        <nav class='top-menu'>
            <a class='navbar-logo' href='#'><img src='../logo.svg' alt='Этот логотип не загрузился'/></a>
            <ul class='menu-main'>
                <li><a href='/'>Users</a></li>
                <li><a href='/projects'>Projects</a></li>
                <li><a href='/todo'>Todo</a></li>
            </ul>
        </nav>
    )
}

