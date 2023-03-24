import React from 'react';



const ProjectItem = ({project}) => {

    return(
        <tr>

            <td>
                {project.name}
            </td>
            <td>
                {project.users}
            </td>
            <td>
                {project.file_link}
            </td>

        </tr>

    )
}

const ProjectList = ({projects}) => {

    return(
        <table>
            <th>
                name
            </th>
            <th>
                users
            </th>
            <th>
                file_link
            </th>

            {projects.map((project) => <ProjectItem project={project}/>)}
        </table>
    )
}

export default ProjectList