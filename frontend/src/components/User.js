import React from 'react';
import {Link} from 'react-router-dom'



const UserItem = ({user}) => {

    return(
        <tr>
            <td>
                {user.id}
            </td>
            <td>
                {user.username}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>

        </tr>

    )
}

const UserList = ({userapp}) => {

    return(
        <table>
            <th>
                username
            </th>
            <th>
                first_name
            </th>
            <th>
                last_name
            </th>
            <th>
                email
            </th>
            {userapp.map((user) => <UserItem user={user}/>)}

        </table>
    )
}

export default UserList