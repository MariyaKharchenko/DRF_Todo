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
import ProjectForm from './components/ProjectForm.js';
import TodoForm from './components/TodoForm.js';
//import ProjectListUsers from './components/ProjectsUser.js';
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

    createProject(name, file_link, users){
        console.log(name, file_link, users)
        const headers = this.get_headers()
        const data = {name:name, file_link:file_link, users:users}
        console.log(data)
        axios.post(get_url('/project/'), data, {headers}).then(response => {
            this.load_data()
            }).catch(error => console.log(error))
        console.log(name, file_link, users)
    }

    createTodo(project, text_todo, user_creator){
        const headers = this.get_headers()
        const data = {project:project, text_todo:text_todo, user_creator:user_creator}
        axios.post(get_url('/todo/'), data, {headers}).then(response => {
            this.load_data()
            }).catch(error => console.log(error))
    }

    deleteProject(id){
        const headers = this.get_headers()
        axios.delete(get_url(`/project/${id}`), {headers}).then(response => {
            this.load_data()
            }).catch(error => console.log(error))
    }

    deleteTodo(id){
        const headers = this.get_headers()
        axios.delete(get_url(`/todo/${id}`), {headers}).then(response => {
            this.setState({todo: this.state.todo.filter((todo)=>todo.id !== id)})
            }).catch(error => console.log(error))
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
                            <Route exact path='/projects/create' component={() => <ProjectForm userapp={this.state.userapp} createProject={(name, file_link, users) => this.createProject(name, file_link, users)}/>}/>
                            <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} deleteProject={(id) => this.deleteProject(id)}/>}/>
                            <Route exact path='/todo/create' component={() => <TodoForm createTodo={(project, text_todo, user_creator) => this.createTodo(project, text_todo, user_creator)}/>}/>
                            <Route exact path='/todo' component={() => <TodotList todo={this.state.todo} deleteTodo={(id) => this.deleteTodo(id)}/>}/>
                            <Route exact path='/login' component={() => <LoginForm get_token={(username, password) => this.get_token(username, password) }/>}/>
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
