import React from 'react';
import logo from '../logo.svg';



export default function Menu() {

    return(
        <nav class='top-menu'>
            <a class='navbar-logo' href='#'><img src='/home/mariya/Рабочий стол/DRF/Todo/DRF_Todo/todo_master/frontend/src/logo.svg' alt='Этот логотип не загрузился'/></a>
            <ul class='menu-main'>
                <li><a href='#'>Программы</a></li>
                <li><a href='#'>Мероприятия</a></li>
                <li><a href='#'>Журнал</a></li>
            </ul>
        </nav>
    )
}

