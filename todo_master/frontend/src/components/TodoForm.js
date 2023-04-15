import React from 'react';
import './Todo.js';


class TodoForm extends React.Component {
    constructor (props) {
        super (props);
        this.state = {'project': 0, 'text_todo': '', 'user_creator': 0}
    }

    handleChange(event) {
        this.setState( {
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {

        this.props.createTodo(this.state.project, this.state.text_todo, this.state.user_creator)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="login">project</label>
                    <input type="number" name="project" placeholder="project"
                    value={this.state.project} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label htmlFor="text_todo">text_todo</label>
                    <input type="text" name="text_todo" placeholder="text_todo"
                    value={this.state.text_todo} onChange={(event)=>this.handleChange(event)} />
                </div>
                <div className="form-group">
                    <label htmlFor="user_creator">user_creator</label>
                    <input type="number" name="user_creator" placeholder="user_creator"
                    value={this.state.user_creator} onChange={(event)=>this.handleChange(event)} />
                </div>
                <input type="submit" value="Save" />
            </form>
        );
    }

}



export default TodoForm