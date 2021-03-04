import React, {useEffect, useState, useReducer} from "react";
import {useParams} from 'react-router-dom';
import {Container, Row, Form, Col, Button, Dropdown} from "react-bootstrap";
import {reducer} from "../commons/reducer";
//import uploadImage from "../commons/uploadImgur";
import uploadImage from "../commons/imgurBack";
import Modal from "../commons/Modal"
import {get} from "leaflet/src/dom/DomUtil";
const baseUrl = 'https://templateparcial3mhb.herokuapp.com/templateEntities'; //local

const initialState = {
    isModalOpen: false,
    modalContent: ""
}

const createTemplateEntity = async (te) => {
    console.log(te);
    const res = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(te),
        redirect: "follow",
    });
    console.log(res);
    return res;
};

const updateTemplateEntity = async (id,te) => {
    console.log("edit:");
    console.log(te);
    const res = await fetch(baseUrl +"/"+id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(te),
        redirect: "follow",
    });
    console.log(res);
    return res;
};

const TemplateEntityForm = () => {
    const options = ['spring','sun','winter', 'dread'];
    const {idAttr} = useParams() || undefined;
    console.log(idAttr);
    const [state, dispatch] = useReducer(reducer, initialState);
    const [validated, setValidated] = useState(false);
    const [templateEntity, setTemplateEntity] = useState( {
        user: '',
        idAttr: '',
        name : '',
        strAttr : '',
        numberAttr: '',
        enumAttr : 'choose',
        nestedAttr : {
            subAttrNumber : '',
            subAttrStr : '',
        },
        images : []
    });

    const formTitle = idAttr && idAttr != "create" ? (
        <h2 style={{ marginBottom: "2rem" }}>Edit</h2>
    ) : (
        <h2 style={{ marginBottom: "2rem" }}>Create</h2>
    );
    const submit = idAttr && idAttr != "create" ? "Edit" : "Submit";

    const getTemplateEntity = async () => {
        try {
            const url = baseUrl+"/"+idAttr;
            const res = await fetch(url);
            console.log(res);
            const tes = await res.json();
            const resTe = tes[0];
            console.log(resTe);
            setTemplateEntity(resTe);
        }catch (e) {
            console.log(e);
        }
    }

    useEffect(()=>{
        if(idAttr !== undefined){getTemplateEntity();}
        else {
            setTemplateEntity({
                idAttr: '',
                name : '',
                strAttr : '',
                numberAttr: '',
                enumAttr : 'choose',
                nestedAttr : {
                    subAttrNumber : '',
                    subAttrStr : '',
                },
                images : []
            })
        }
        console.log(templateEntity);
    },[]);

    const handleChange= (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "subAttrNumber" || name === "subAttrStr") {
            setTemplateEntity({
                ...templateEntity,
                nestedAttr: { ...templateEntity.nestedAttr, [name]: value },
            });
        }else{
            setTemplateEntity({...templateEntity, [name]:value });
        }
    }

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        e.preventDefault();

        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        if(templateEntity.idAttr && templateEntity.name && templateEntity.enumAttr!=="choose"){ //minimum to create/edit
            const url = baseUrl+"/"+idAttr;
            const res = await fetch(url);
            const data = await res.json();
            console.log("finding: " + url)
            console.log(data);
            if(data.length!==0){//there is a templateEntity with the sciName-> edit
                updateTemplateEntity(idAttr, templateEntity)
                    .then((res)=>{
                        if(res.status >= 500){
                            dispatch({ type: "NO_VALUE" });
                        }else{
                            dispatch({type : "UPDATE_ITEM"});
                            setValidated(true);
                        }
                    });
            }else{
                createTemplateEntity(templateEntity)
                    .then((res)=>{
                        if(res.status >= 500){
                            dispatch({ type: "NO_VALUE" });
                        }else{
                            dispatch({ type: "ADD_ITEM" });
                            setTemplateEntity({
                                user: '',
                                idAttr: '',
                                name : '',
                                strAttr : '',
                                numberAttr: '',
                                enumAttr : 'choose',
                                nestedAttr : {
                                    subAttrNumber : '',
                                    subAttrStr : '',
                                },
                                images : []
                            });
                        }
                        setValidated(false);
                    })

            }
        }else {
            dispatch({ type: "NO_VALUE" });
            setValidated(true);
        }
    }

    const closeModal = () => {
        dispatch({ type: "CLOSE_MODAL" });
    };

    return (
        <>
            <Container>
                {formTitle}
                {state.isModalOpen && (
                    <Modal closeModal={closeModal} modalContent={state.modalContent} />
                )}
                <Row>
                    <Form noValidate validated={validated}>
                        <Row>
                            <Col>
                                <Form.Group controlId = "plant">
                                    <Form.Label>User: </Form.Label>
                                    <Form.Control required name = "user" type="text" value = {templateEntity.user}
                                                  onChange ={handleChange}/>
                                    <Form.Control.Feedback type="invalid">
                                        Please insert valid values.
                                    </Form.Control.Feedback>
                                    <Form.Label>Id attribute: </Form.Label>
                                    <Form.Control required name = "idAttr" type="text" value = {templateEntity.idAttr}
                                                  onChange ={handleChange}/>
                                    <Form.Control.Feedback type="invalid">
                                        Please insert valid values.
                                    </Form.Control.Feedback>

                                    <Form.Label>Name: </Form.Label>
                                    <Form.Control required name = "name" type="text" value = {templateEntity.name}
                                                  onChange ={handleChange}/>
                                    <Form.Control.Feedback type="invalid">
                                        Please insert valid values.
                                    </Form.Control.Feedback>

                                    <Form.Label>strAttr: </Form.Label>
                                    <Form.Control required name = "strAttr" type="text" value = {templateEntity.strAttr}
                                                  onChange ={handleChange}/>
                                    <Form.Control.Feedback type="invalid">
                                        Please insert valid values.
                                    </Form.Control.Feedback>

                                    <Form.Label>numberAttr: </Form.Label>
                                    <Form.Control required name = "numberAttr" type="number" value = {templateEntity.numberAttr}
                                                  onChange ={handleChange}/>
                                    <Form.Control.Feedback type="invalid">
                                        Please insert valid values.
                                    </Form.Control.Feedback>

                                    <Form.Label>enumAttr: </Form.Label>
                                    <Form.Control as="select" name = "enumAttr"
                                                  onChange ={handleChange} value = {templateEntity.enumAttr}>
                                        <option selected>choose</option>
                                        {options.map((o)=>{
                                            return(
                                                <option>{o}</option>
                                            )
                                        })}
                                    </Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please select valid values.
                                    </Form.Control.Feedback>

                                    <Form.Label>nestedAttr: </Form.Label>
                                    <Col>
                                        <Form.Label>str: </Form.Label>
                                        <Form.Control required name = "subAttrStr" type="text" value = {templateEntity.nestedAttr.subAttrStr}
                                                      onChange ={handleChange}/>
                                    </Col>
                                    <Col>
                                        <Form.Label>number: </Form.Label>
                                        <Form.Control required name = "subAttrNumber" type="number" value = {templateEntity.nestedAttr.subAttrNumber}
                                                      onChange ={handleChange}/>
                                    </Col>
                                    <Form.Control.Feedback type="invalid">
                                        Please select valid values.
                                    </Form.Control.Feedback>

                                    <Form.Group controlId="image">
                                        <Form.Label>Images: </Form.Label>
                                        <br />
                                        {(!templateEntity.images) || (templateEntity.images.length === 0) ? <h6>No images yet</h6> :
                                            templateEntity.images.map((image)=>{
                                                return(
                                                    <img key={image} src={image}/>
                                                )
                                            })
                                        }
                                        <Form.Control
                                            type="file"
                                            name="image"
                                            className="input-image"
                                            onChange={() => uploadImage({ templateEntity, setTemplateEntity })}
                                        />
                                    </Form.Group>
                                </Form.Group>

                            </Col>
                        </Row>
                        <Row>
                            <Button variant = "primary" type = "submit" onClick ={handleSubmit}>
                                {submit}
                            </Button>
                        </Row>
                    </Form>
                </Row>
            </Container>
        </>
    );
};

export default TemplateEntityForm;
