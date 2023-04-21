import React from 'react';
import './Project.js';
import './User.js';


class ProjectForm extends React.Component {
    constructor (props) {
        super (props);
        this.state = {'name': '', 'file_link': '', 'users': []}
    }


    handleUserChange(event){
        if(!event.target.selectedOptions){
        this.setState({
            'users': []
            })
            return;
        }
        let userapp = []
        for(let i = 0; i < event.target.selectedOptions.length; i++){
            userapp.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({
            'users': userapp
            })
            return;




    }


    handleChange(event) {
        this.setState( {
            [event.target.name]: event.target.value

        });
        console.log(event.target.name, event.target.value)
    }


    handleSubmit(event) {

        this.props.createProject(this.state.name, this.state.file_link, this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="login">name</label>
                    <input type="text" name="name" placeholder="name"
                    value={this.state.name} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label htmlFor="file_link">file_link</label>
                    <input type="text" name="file_link" placeholder="file_link"
                    value={this.state.file_link} onChange={(event)=>this.handleChange(event)} />
                </div>
                <select name="users" multiple onChange={(event)=>this.handleUserChange(event)}>
                    {this.props.userapp.map((item) => <option key={item.id} value={item.id}>{item.username}</option>)}
//                    {this.props.userapp.map((item) => <option key={`${item.id}`} value={`${item.id}`}>{`${item.username}`}</option>)}
                </select>

                <input type="submit" value="Save" />
            </form>
        );
    }

}



export default ProjectForm