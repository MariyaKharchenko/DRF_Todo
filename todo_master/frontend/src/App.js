import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import Menu from './components/Menu.js';
import Footer from './components/Footer.js';


const DOMAIN = 'http://127.0.0.1:8000/api'
const get_url = (url) => `${DOMAIN}${url}`


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'userapp': []
        }
    }

    componentDidMount() {

        /*const userapp = [
            {
            'username': 'Василисушка',
            'first_name': 'Василиса',
            'last_name': 'Прекрасная',
            'email': 'Vasilisa@mail.ru'
            },
            {
            'username': 'Серый@',
            'first_name': 'Волк',
            'last_name': 'Серый',
            'email': 'Seriiy@gav.me'
            }
        ] */
        axios.get(get_url('/userapp')).then(response => {
            this.setState({'userapp': response.data})
            }).catch(error => console.log(error))

        }

    render() {
        return (
            <div>
                <div>
                    <header>
                        <Menu/>
                    </header>
                </div>
                <div>
                    <UserList userapp={this.state.userapp}/>
                </div>
                <div>
                    <footer>
                        <Footer/>
                    </footer>
                </div>
            </div>
        );
    }
}

export default App;
