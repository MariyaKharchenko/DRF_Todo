import React from 'react';
import '../logo.svg';



export default function Menu() {

    return(
        <nav class='top-menu'>
            <a class='navbar-logo' href='#'><img src='https://icons8.ru/icon/123603/react-native' alt='Этот логотип не загрузился'/></a>
            <ul class='menu-main'>
                <li><a href='#'>Программы</a></li>
                <li><a href='#'>Мероприятия</a></li>
                <li><a href='#'>Журнал</a></li>
            </ul>
        </nav>
    )
}

