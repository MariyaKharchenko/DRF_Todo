import React from 'react';
import UserItem from './User.js'




const TotoItem = ({todo, deleteTodo}) => {

    return(
        <tr>
            <td>
                {todo.id}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.text_todo}
            </td>
            <td>
                {todo.user_creator}
            </td>
            <td>
                {todo.date_create}
            </td>
            <td>
                {todo.date_update}
            </td>
            <td>
                {todo.closed}
            </td>
            <td><button onClick={()=>deleteTodo(todo.id)} type='button'>Delete</button></td>

        </tr>

    )
}

const TodotList = ({todo, deleteTodo}) => {

    return(
        <table>
            <th>
                project
            </th>
            <th>
                text_todo
            </th>
            <th>
                user_creator
            </th>
            <th>
                date_create
            </th>
            <th>
                date_update
            </th>
            <th>
                closed
            </th>
            <th></th>

            {todo.map((todo) => <TotoItem todo={todo} deleteTodo={deleteTodo}/>)}
        </table>
    )
}

export default TodotList