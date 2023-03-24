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
import{Route, BrowserRouter, Link, Switch} from 'react-router-dom';


const DOMAIN = 'http://127.0.0.1:8000/api'
const get_url = (url) => `${DOMAIN}${url}`


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'userapp': [],
            'projects': [],
            'todo': []
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
            this.setState({'userapp': response.data.results})
            }).catch(error => console.log(error))

        axios.get(get_url('/project')).then(response => {
            this.setState({'projects': response.data.results})
            }).catch(error => console.log(error))

        axios.get(get_url('/todo')).then(response => {
            this.setState({'todo': response.data.results})
            }).catch(error => console.log(error))

        }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <header>
                            <Menu/>
                        </header>
                    </div>
                    <div>
                        <Switch>
                            <Route exact path='/' component={() => <UserList userapp={this.state.userapp}/>}/>
                            <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>
                            <Route exact path='/todo' component={() => <TodotList todo={this.state.todo}/>}/>
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
