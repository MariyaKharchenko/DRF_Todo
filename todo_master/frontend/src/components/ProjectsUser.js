//import React from 'react';
//import {useParams} from 'react-router-dom';
//import ProjectItem from './Project.js'
//
//
//const ProjectListUsers = ({projects}) => {
//    console.log(projects)
//
//    let {id} = useParams()
//    let filter_item = projects.filter((project = project.users.includes(parseInt(id))))
//
//    return(
//        <div>
//            <table>
//                <th>
//                    name
//                </th>
//                <th>
//                    users
//                </th>
//                <th>
//                    file_link
//                </th>
//                <th></th>
//
//                {filter_item.map((project) => <ProjectItem project={project}/>)}
//
//            </table>
//        </div>
//    )
//}
//
//export default ProjectListUsers