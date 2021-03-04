import React, {useEffect, useReducer, useState} from "react";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {Col, Container, Row, Form, Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "../commons/Modal"
import {reducer} from "../commons/reducer";
import {useParams} from "react-router-dom";

//mi malaguita
const DEFAULT_LAT = 36.7151534;
const DEFAULT_LONG = -4.2905799;
const baseUrl = 'https://templateparcial3mhb.herokuapp.com/mapEntities'; //local

const createMapEntity = async (me) => {
    const res = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(me),
        redirect: "follow",
    });
    console.log(res);
};

const editMapEntity = async (me) =>{
    console.log("edit:");
    console.log(me);
    const res = await fetch(baseUrl +"/"+ me._id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(me),
        redirect: "follow",
    });
    console.log(res);
}

const initialState = {
    isModalOpen: false,
    modalContent: ""
}

const MapEntities = () => {
    const {user} = useParams();
    const [state, dispatch] = useReducer(reducer, initialState);
    const [center, setCenter] = useState([DEFAULT_LAT, DEFAULT_LONG])
    const [nominatimInput, setNominatimInput] = useState("");
    const [mapEntities, setMapEntities] = useState([]);
    const [mapEntity, setMapEntity] = useState({
        _id : '',
        user: '',
        name : '',
        year : '',
        location : {
            lat : '',
            lon : ''
        }
    });

    const getMapEntities = async () => {
        console.log(user);
        const url = user && user !== ""?baseUrl+"?user="+user : baseUrl;
        console.log(url);
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        let rdo = [];
        data.map((me)=>{
                const {id, name, year, location} = me;
                if(location !== undefined && location.lat !== undefined && location.lon !== undefined){
                    rdo.push(me);
                }
            }
        );
        setMapEntities(rdo);
        console.log(rdo);
    }

    const deleteMapEntity = async (_id) =>{
        const url =  baseUrl+"/"+ _id;
        const res = await fetch(url, {method : "DELETE"});
        console.log(res);
        setCenter([DEFAULT_LAT, DEFAULT_LONG]);
        getMapEntities();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === "lat" || name === "lon") {
            setMapEntity({
                ...mapEntity,
                location: { ...mapEntity.location, [name]: value },
            });
        } else {
            setMapEntity({ ...mapEntity, [name]: value });
        }
    };

    const handleSubmit =  async (e) => {
        e.preventDefault(e);
        if (e.currentTarget.checkValidity() === false) {
            e.stopPropagation();
        }

        if (mapEntity.name && mapEntity.year &&
            mapEntity.location.lat && mapEntity.location.lon) {

            if(mapEntity._id){
                editMapEntity(mapEntity).then(getMapEntities);
            }else{
                createMapEntity(mapEntity).then(getMapEntities);;
            }
            setCenter([mapEntity.location.lat, mapEntity.location.lon]);
            setMapEntity({
                _id : '',
                user:'',
                name : '',
                year : '',
                location : {
                    lat : '',
                    lon : ''
                }
            });
        }else if (nominatimInput){
            let input = nominatimInput.split(' ').join('+');
            let url = 'https://nominatim.openstreetmap.org/?q='+input+'&format=geojson&limit=1';
            console.log(url);
            const data = await fetch(url).then((res)=>res.json());
            console.log(data);
            if (data && data.features.length > 0){
                const coordinates = {
                    lat : data.features[0].geometry.coordinates[1],
                    lon : data.features[0].geometry.coordinates[0]
                }
                setMapEntity({
                    _id : '',
                    user: '',
                    name : nominatimInput,
                    year : '',
                    location : coordinates
                });
                setNominatimInput("");
            }else{
                dispatch({type : "NO_PLACE_FOUND"});
            }
        }
    };

    useEffect(()=>{
        getMapEntities()
    },[]);

    const closeModal = () => {
        dispatch({ type: "CLOSE_MODAL" });
    };

    return(
        <Container>
            {state.isModalOpen && (
                <Modal closeModal={closeModal} modalContent={state.modalContent} />
            )}
            <Row>
                <h1>Map</h1>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Year</th>
                            <th>Lat</th>
                            <th>Lon</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {mapEntities.map((me) => {
                            const {_id, name, year} = me;
                            const {lat, lon} = me.location;
                            return (
                                <tr onClick={()=>setCenter([me.location.lat, me.location.lon])}>
                                    <td>{name}</td>
                                    <td>{year}</td>
                                    <td>{lat}</td>
                                    <td>{lon}</td>
                                    <td>
                                        <Button variant="primary"
                                                onClick = {() => setMapEntity(me)}>
                                            Edit
                                        </Button>
                                    </td>
                                    <td>
                                        <Button variant="danger"
                                            onClick = {() => deleteMapEntity(me._id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </Table>
                    <Form>
                        <Form.Row>
                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={mapEntity.name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="user">
                                <Form.Label>User</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="user"
                                    value={mapEntity.user}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="year">
                                <Form.Label>Year</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="year"
                                    value={mapEntity.year}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="lat">
                                <Form.Label>Latitude</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="lat"
                                    value={mapEntity.location.lat}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="lon">
                                <Form.Label>Longitude</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="lon"
                                    value={mapEntity.location.lon}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group controlId="nominatimInput">
                                <Form.Label>Or search location by name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="nominatimInput"
                                    value={nominatimInput}
                                    onChange={(e)=>{setNominatimInput(e.target.value);}}
                                />
                            </Form.Group>
                        </Form.Row>

                        <Button
                            style={{ marginBottom: "2rem" }}
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col>
                    <MapContainer key={center} center={center} zoom={13} scrollWheelZoom={true}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {
                            mapEntities.map((me)=>{
                                const {id, name, year, location} = me;
                                return (
                                    <Marker position={[location.lat, location.lon]}>
                                        <Popup>
                                            {name} <br />
                                            {year}
                                        </Popup>
                                    </Marker>
                                )
                            })}
                    </MapContainer>
                </Col>
            </Row>
        </Container>
    );
}

export default MapEntities;