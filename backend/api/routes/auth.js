const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const {OAuth2Client} = require('google-auth-library');

const clientId = process.env.OAUTH_CLIENT_ID;// "545116547116-ian4bjhmn6nu0ao5563tt5ir5pqsa8s9.apps.googleusercontent.com"
const client = new OAuth2Client(clientId);
let token = "";

router
    .route("/")
    .post(async (req, res, next) =>{
        console.log(req.body);
        console.log(req.body.idtoken);
        token = req.body.idtoken;
        try{
            const ticket = await client.verifyIdToken({
                idToken: req.body.idtoken,
                audience: clientId,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            console.log(payload);
            const userid = payload['sub'];
            console.log(userid);
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
            const url = "https://oauth2.googleapis.com/tokeninfo?id_token="+token;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            console.log(data.aud === clientId);
            /*if(data.aud === clientId){
                await res.status(500).json({
                    error: {
                        message: "invalid token",
                    },
                });
            }else{
                await res.status(200).json({
                    message: "token validated",
                });
            }*/
        }catch (e) {
            next(e);
        }
    });
module.exports = router;