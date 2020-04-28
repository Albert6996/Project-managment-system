import React, { Component } from 'react';
import { Card, Table, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faEdit, faTrash, faAdjust } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class TaskList extends Component {



    constructor(props) {
        super(props);
        const { match: { params } } = this.props;



        this.state = {
            lists: []
        }

        this.api = `http://localhost:9090/api/projects/${params.projectId}/tasks`;

        const x = this.api.slice(35);

        const projId = x.substring(0, x.indexOf("/")); // gaunam projectId, kad galima butu ji perduoti i edit task, kad ten atsirastu projectId i post metoda (perduot ji reik i sitos klases render metoda);

    }


    componentDidMount() {

        this.getLists();


    }


    getLists() {

        axios.get(this.api)
            .then((data) => {
                this.setState({ lists: data.data });


            })
            .catch((error) => {
                console.log(error)
            })

    };

    deleteTask = (taskId) => {

        axios.delete(this.api + "/" + taskId)
            .then(response => {

                if (response != null)
                    alert("Deleted successfully");
                this.setState({
                    lists: this.state.lists.filter(x => x.id !== taskId)

                });

            });

    };

    render() {
        const { lists } = this.state;



        return (

            < Card className={"border border-dark bg-dark text-white"} >
                <Card.Header><FontAwesomeIcon icon={faList} />  Task list </Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                        <thead>
                            <tr>
                                <td>Task Id</td>
                                <td>Task Name</td>
                                <td>Task Description</td>
                                <td>Task Status</td>
                                <td>Task Priority</td>
                                <td>Task Create Time</td>
                                <td>Task Modify Time</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lists.length ?
                                    lists.map(task => {
                                        return (

                                            <tr key={task.id}>
                                                <td>{task.id}</td>
                                                <td>{task.taskName} </td>
                                                <td>{task.taskDescription} </td>
                                                <td>{task.taskPriority}</td>
                                                <td>{task.taskState} </td>
                                                <td>{task.taskCreateTime}</td>
                                                <td>{task.taskModifyTime}</td>
                                                <td>
                                                    <ButtonGroup>
                                                        <Link to={"taskedit/" + task.id} className="btn btn-sm btn-outline-primary"> <FontAwesomeIcon icon={faEdit} />  </Link>{''}

                                                        <Button size="sm" variant="outline-danger" onClick={this.deleteTask.bind(this, task.id)}>
                                                            <FontAwesomeIcon icon={faTrash} /> </Button>{''}
                                                        <Link to={"addtask"} className="btn btn-sm btn-outline-primary"> <FontAwesomeIcon icon={faAdjust} />  </Link>{''}

                                                    </ButtonGroup>
                                                </td>
                                            </tr>)
                                    })
                                    :
                                    null

                            }
                        </tbody>

                    </Table>
                </Card.Body>
            </Card >
        );

    }
}