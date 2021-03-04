import React, {useEffect, useState, useReducer} from "react";
import {useParams} from 'react-router-dom';
import {Container, Row, Form, Col, Modal, Button} from "react-bootstrap";
import Image from "react-bootstrap/Image";

const baseUrl = 'https://templateparcial3mhb.herokuapp.com/templateEntities'; //local
const apiKey = '5f81c76dd454edd878125b93027076c4';
const secret = 'e7f6b3020860a62a';

const TemplateEntityInfo = () => {
    const {idAttr} = useParams();
    console.log(idAttr);
    const [flickrPhotos, setFlickrPhotos] = useState([]);
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

    const loadFlickr = async (name) => {
        let rdo = [];
        const data = await fetch("https://api.flickr.com/services/rest/?method=flickr.photos.search&nojsoncallback=1&format=json&per_page=3&content_type=1&api_key=5f81c76dd454edd878125b93027076c4&tags="+name)
            .then((res)=>res.json());
        console.log("Flickr:")
        console.log(data);
        if(data && data.photos.photo) {
            data.photos.photo.map((pic) => {
                rdo.push(
                    `https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`
                );
            });
            setFlickrPhotos(rdo);
        }
    }

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
        getTemplateEntity();//.then(()=>loadFlickr(templateEntity.name));
    },[]);

    useEffect(()=>{
        if(templateEntity.name && templateEntity.name!=='')
            loadFlickr(templateEntity.name);
    },[templateEntity.name])

    return (
        <>
            <Container>
                <Row> <h2>Name: {templateEntity.name}</h2> </Row>
                <Row> <h5>User: {templateEntity.user}</h5> </Row>
                <Row> <h5>Id: {templateEntity.idAttr}</h5> </Row>
                <Row> <h6>Filter: {templateEntity.strAttr}</h6> </Row>
                <Row> <p>Number: {templateEntity.numberAttr}</p></Row>
                <Row> <p>Enum: {templateEntity.enumAttr}</p></Row>
                <Row>
                    Nested: <br/>
                    <Col><p>Type: {templateEntity.nestedAttr.subAttrStr}</p></Col>
                    <Col><p>Number: {templateEntity.nestedAttr.subAttrNumber}</p></Col>
                </Row>
                <Row>
                    Photos: {(!templateEntity.images) || (templateEntity.images.length === 0) ? <p>No images</p> :
                        templateEntity.images.map((image)=>{
                            return(
                                <img key={image} src={image}/>
                            )
                        })
                    }
                </Row>
                <Row>
                    Related pictures (powered by Flickr): {flickrPhotos.length === 0? <p> No images from Flicker</p>
                    : flickrPhotos.map((pic)=>{
                        return (

                            <Row>
                                <Container><img src={pic}/></Container>
                            </Row>
                        )
                    })
                }
                </Row>
            </Container>
        </>
    );
};

export default TemplateEntityInfo;
