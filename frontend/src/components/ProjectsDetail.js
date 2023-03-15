import React from "react";
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import { useParams } from "react-router-dom";


class ProjectDetailPk extends React.Component {

    constructor(props) {
        super(props);
        this.pk = props.pk;
        this.apiUrl = 'http://127.0.0.1:8000/api/projects/' + this.pk;
        this.state = {
            'data': [],
            'users': [],
            'todos': []
        }
    }

    componentDidMount() {
        axios.get(this.apiUrl)
            .then(response => {
                const data = response.data;
                console.log(data);
                this.setState({
                    'data': data
                })
                return data;
            })
            .then(response => {
                response.users.forEach(user => {
                    axios.get()
                        .then(response => {
                            const data = response.data;
                            console.log(data);
                            this.setState({
                                'users': this.state.users.push(data.userName)
                            })
                        }).catch(error => console.log(error))
                });
            }).catch(error => console.log(error))
    }

    render() {
        const data = this.state.data;
        const users = this.state.users;
        const todos = this.state.todos;
        return (
            <Card style={{ display: 'flex' }}>
                <Card.Header>{data.name}</Card.Header>
                <Card.Body>
                    <Card.Title>Заметки</Card.Title>
                    <Card.Text>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>data.</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>data.</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '18rem' }}>
                            <Card.Body>
                                <Card.Title>data.</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the
                                    bulk of the card's content.
                                </Card.Text>
                                <Card.Link href="#">Card Link</Card.Link>
                                <Card.Link href="#">Another Link</Card.Link>
                            </Card.Body>
                        </Card>
                    </Card.Text>
                    <Card.Title><a href={data.repoLink} target='_blank' >Репозиторий</a></Card.Title>


                </Card.Body>
            </Card>
        );
    }
}

// const ProjectTodos = (pk) => {
//     return (<Card style={{ width: '18rem' }}>
//         <Card.Body>
//             <Card.Title>data.</Card.Title>
//             <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
//             <Card.Text>
//                 Some quick example text to build on the card title and make up the
//                 bulk of the card's content.
//             </Card.Text>
//             <Card.Link href="#">Card Link</Card.Link>
//             <Card.Link href="#">Another Link</Card.Link>
//         </Card.Body>
//     </Card>)
// }

export default function ProjectDetail() {
    const { pk } = useParams();
    return (
        <ProjectDetailPk pk={pk} />
    );
}