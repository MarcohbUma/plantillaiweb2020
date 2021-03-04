const express = require('express');
const router = express.Router();
const mapEntityService = require('../services/mapEntityService')

router
    .route("/")
    .get(async (req, res, next) =>{
        try{
            if(req.query.user){
                const doc = await mapEntityService.findByUser(req.query.user);
                await res.status(200).json(doc);
            }else{
                const doc = await mapEntityService.findAll();
                await res.status(200).json(doc);
            }

        }catch (e) {
            next(e);
        }
    })
    .post(async (req, res, next) =>{
        try{
            const doc = await mapEntityService.create(req.body);
            await res.status(201).json(doc);
        }catch (e) {
            next(e);
        }
    });

router
    .route("/:id")
    .get(async (req, res, next) =>{
        try{
            const doc = await mapEntityService.findById(req.params.id);
            await res.status(200).json(doc);
        }catch (e) {
            next(e);
        }
    })
    .delete(async (req, res, next) =>{
        try{
            const doc = await mapEntityService.delete(req.params.id);
            await res.status(200).json(doc);
        }catch (e) {
            next(e);
        }
    })
    .put(async (req, res, next) =>{
        try{
            const doc = await mapEntityService.edit(req.params.id, req.body);
            await res.status(200).json(doc);
        }catch (e) {
            next(e);
        }
    });

module.exports = router;