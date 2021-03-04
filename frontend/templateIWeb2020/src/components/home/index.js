import React, {useEffect, useState} from 'react';
import { GoogleLogin } from 'react-google-login';
import {Container, Row, Form} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
const baseUrl = 'https://test1parcial3web.herokuapp.com/templateEntities'; //local

const authRoute = "https://templateparcial3mhb.herokuapp.com/auth";
//const authRoute = "http://localhost:3030/auth";

const Home = () => {
    const [user, setUser] = useState({
        email: "",
        familyName: "",
        givenName: "",
        googleId: "",
        imageUrl: "",
        name: ""
    });


    /*useEffect(()=>{
        var e = document.createElement("script");
        e.type = "text/javascript";
        e.async = true;
        e.src = "https://apis.google.com/js/platform.js";
        var t = document.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(e, t);
    },[]);*/

    useEffect(()=>{
        setUser({
            email: "",
            familyName: "",
            givenName: "",
            googleId: "",
            imageUrl: "",
            name: ""
        });
    }, []);

    function signOut() {
        const gapi = window.gapi;
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
            setUser({
                email: "",
                familyName: "",
                givenName: "",
                googleId: "",
                imageUrl: "",
                name: ""
            });
        });
    }

    const responseGoogle = async (response)=>{
        //console.log(response);
        //console.log(response.profileObj);
        console.log("USUARIO");
        if(response.profileObj){
            setUser(response.profileObj);
            console.log(response.profileObj);
            console.log("Fetching to backend");
            const idToken = {idtoken : response.tokenId};
            console.log(idToken);
            const res = await fetch(authRoute, {
                method: "POST",
                headers: { 'Content-Type':'application/json' },
                body: JSON.stringify(idToken),
                redirect: "follow",
            }).then((res)=>console.log(res));
        }
    }

    return (
        <>
            <Container>
                {!user || user.email === '' ?
                    <h3>No user logged in</h3> :
                    <h3>User {user.email} logged in</h3>
                }
                <GoogleLogin
                    clientId="545116547116-ian4bjhmn6nu0ao5563tt5ir5pqsa8s9.apps.googleusercontent.com"
                    buttonText= {user.email && user.email !== ""? "Switch account" : "Login"}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                /><br/>
                <a href="#" onClick={signOut}>Sign out</a>
            </Container>

            <Container>
                <Card className="text-center">
                    <Card.Header>Parcial 3 Marco Hurtado Bandrés</Card.Header>
                    <Card.Body>
                        <Card.Title>Management</Card.Title>
                        <Card.Text>
                            Click here or in the navbar
                        </Card.Text>
                        <Button variant="primary">
                            <Link to ='/templateEntities' className = 'link'>
                                Entities
                            </Link>
                        </Button>
                        <br/><br/>
                        <Button variant="primary">
                            <Link to ='/mapEntities' className = 'link'>
                                Map Stuff
                            </Link>
                        </Button>
                    </Card.Body>
                    <Card.Footer className="text-muted"></Card.Footer>
                </Card>
                <Form>
                    <Form.Group controlId = "user">
                        <Form.Control required name = "email" type="text" value = {user.email}
                                      onChange={(e)=>setUser({...user, email: e.target.value})}/>
                        <Form.Control.Feedback type="invalid">
                            Please insert valid value.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant = "primary" href={`/mapEntities/${user.email}`}>
                        Map by user
                    </Button>
                    <Button variant = "primary" href={`/templateEntities/user/${user.email}`}>
                        Entities by user
                    </Button>
                </Form>
            </Container>
        </>
    );
}

export default Home;