import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {ListGroup, Container, Row, Col, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

//const baseUrl = 'http://localhost:3030/templateEntities'; //local
const baseUrl = 'https://templateparcial3mhb.herokuapp.com/templateEntities'
const TemplateEntities = () => {
    const {user} = useParams();
    const [templateEntities, setTemplateEntities] = useState([]);
    const [input, setInput] = useState("");

    const getTemplateEntities = async () => {
        try {
            let url;
            //url = input !== ""? baseUrl+"/?strAttr="+input : baseUrl;
            url = user && user !== ""? baseUrl+"/?user="+user : baseUrl;
            const res = await fetch(url);
            const tes = await res.json();
            console.log(tes);
            setTemplateEntities(tes);
        }catch (e) {
            console.log(e);
        }
    };

    const handleFilter = async (e) => {
        e.preventDefault();
        getTemplateEntities();
    };

    const deleteTemplateEntity = async (idAttr) =>{
        const url =  baseUrl+"/"+idAttr;
        await fetch(url, {method : "DELETE"});
        getTemplateEntities();
    }

    useEffect(()=>{
        getTemplateEntities(); //fetch data
    }, []);

    const handleChange = (e)=>{
        setInput(e.target.value);
        //getProducts();
    }

    return (
        <>
            <Container>
                <Row>
                    <h3>List</h3>
                </Row>
                <Row>
                    <Form>
                        <Form.Group controlId = "filterSearch">
                            <Form.Label>Filter by : </Form.Label>
                            <Form.Control name = "filter" type="text" value = {input}
                                          onChange ={handleChange}/>
                            <Button variant = "primary" type = "submit" onClick ={handleFilter}>
                                Filter
                            </Button>
                        </Form.Group>
                    </Form>
                </Row>
                <Row>
                    <Button variant = "light" type = "submit">
                        <Link to={`/newTemplateEntity`}>Create</Link>
                    </Button>
                </Row>
                <Row>
                    <Col>
                        <section className="users">
                            <ListGroup>
                                {templateEntities.map((te)=>{
                                    const {user, idAttr, name, strAttr, numberAttr, enumAttr, nestedAttr, images} = te;
                                    return (
                                        <Col>
                                            <Container>
                                                <ListGroup.Item key = {idAttr}>
                                                    <h5>{name}</h5> <br/>
                                                    User: {user} <br/>
                                                    Filter: {strAttr}<br/>
                                                    Number: {numberAttr}<br/>
                                                    Enum: {enumAttr}<br/>
                                                    Nested: ({nestedAttr.subAttrNumber}, {nestedAttr.subAttrStr})
                                                    {images && images.length!==0?
                                                        <p>{images.length} photos</p> :
                                                        <p>No photos</p>
                                                    }
                                                    <Link to = {`/templateEntities/${idAttr}`}>
                                                        Details
                                                    </Link>
                                                    <br/>
                                                    <Button variant = "danger" onClick ={()=>deleteTemplateEntity(idAttr)}>
                                                        Delete
                                                    </Button>
                                                    <Button variant = "light" href={`/templateEntities/edit/${idAttr}`}>
                                                        Edit
                                                    </Button>
                                                </ListGroup.Item>
                                            </Container>
                                        </Col>
                                    )
                                })}
                            </ListGroup>
                        </section>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default TemplateEntities;