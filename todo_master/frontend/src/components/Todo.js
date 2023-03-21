import React from 'react';



const TotoItem = ({todo}) => {

    return(
        <tr>

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

        </tr>

    )
}

const TodotList = ({todo}) => {

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

            {todo.map((todo) => <TotoItem todo={todo}/>)}
        </table>
    )
}

export default TodotList