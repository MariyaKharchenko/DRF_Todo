import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';
import UserList from './components/User.js';
import ProjectList from './components/Project.js';
import TodotList from './components/Todo.js';
import Menu from './components/Menu.js';
import Footer from './components/Footer.js';
import NotFound from './components/NotFound.js';
import LoginForm from './components/Auth.js';
import{Route, BrowserRouter, Link, Switch} from 'react-router-dom';

import Cookies from 'universal-cookie';


const DOMAIN = 'http://127.0.0.1:8000/api'
const get_url = (url) => `${DOMAIN}${url}`


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'userapp': [],
            'projects': [],
            'todo': [],
            'token': ''
        }
    }
    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, ()=>this.load_data())
    }
    is_authenticated() {
        return this.state.token != ''
    }
    logout() {
        this.set_token('')
    }
    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())
    }
    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username,
    password: password})
        .then(response => {
            this.set_token(response.data['token'])
        }).catch(error => alert('Неверный логин или пароль'))
    }
    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_authenticated()){
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }

    load_data() {
        const headers = this.get_headers()
        axios.get(get_url('/userapp'), {headers}).then(response => {
            this.setState({'userapp': response.data.results})
            }).catch(error => {
                alert('Не верный логин или пароль.')
                this.setState({userapp: []})
            })

        axios.get(get_url('/project'), {headers}).then(response => {
            this.setState({'projects': response.data.results})
            }).catch(error => console.log(error))

        axios.get(get_url('/todo'), {headers}).then(response => {
            this.setState({'todo': response.data.results})
            }).catch(error => console.log(error))
    }
    componentDidMount() {
        this.get_token_from_storage()
    }


    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <header>
                            <nav class='top-menu'>
                                <a class='navbar-logo' href='#'><img src='../logo.svg' alt='Этот логотип не загрузился'/></a>
                                <ul class='menu-main'>
                                    <li><Link to='/'>Users</Link></li>
                                    <li><Link to='/projects'>Projects</Link></li>
                                    <li><Link to='/todo'>Todo</Link></li>
                                    <li>
                                        {this.is_authenticated() ? <button class='menu-main' onClick={()=>this.logout()}>Logout</button> :
                                        <Link to='/login'>Login</Link>}
                                    </li>
                                </ul>
                            </nav>
                        </header>
                    </div>
                    <div>
                        <Switch>
                            <Route exact path='/' component={() => <UserList userapp={this.state.userapp}/>}/>
                            <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>
                            <Route exact path='/todo' component={() => <TodotList todo={this.state.todo}/>}/>
                            <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password)}/>}/>
                            <Route component={NotFound}/>
                        </Switch>
                    </div>
                    <div>
                        <footer>
                            <Footer/>
                        </footer>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
