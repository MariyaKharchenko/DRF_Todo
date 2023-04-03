import React from 'react';



const ProjectItem = ({project, deleteProject}) => {

    return(
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                {project.name}
            </td>
            <td>
                {project.users}
            </td>
            <td>
                {project.file_link}
            </td>
            <td><button onClick={()=>deleteProject(project.id)} type='button'>Delete</button></td>

        </tr>

    )
}

const ProjectList = ({projects, deleteProject}) => {

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
            <th></th>

            {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
        </table>
    )
}

export default ProjectList