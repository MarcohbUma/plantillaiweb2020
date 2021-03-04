const express = require('express');
const router = express.Router();
const templateEntityService = require('../services/templateEntityService')

router
    .route("/")
    .get(async (req, res, next) =>{
        try{
            if(req.query.strAttr){ //find query
                const doc = await templateEntityService.findByStrAttr(req.query.strAttr);
                await res.status(200).json(doc);
            }else if(req.query.user){ //find query
                const doc = await templateEntityService.findByUser(req.query.user);
                await res.status(200).json(doc);
            }else{ //find all
                const doc = await templateEntityService.findAll();
                await res.status(200).json(doc);
            }
        }catch (e) {
            next(e);
        }
    })
    .post(async (req, res, next) =>{
        try{
            const doc = await templateEntityService.create(req.body);
            await res.status(201).json(doc);
        }catch (e) {
            next(e);
        }
    })
router
    .route("/:idAttr")
    .get(async (req, res, next) =>{ //GET BY ID (or attribute that works as ID)
        try{
            const doc = await templateEntityService.findByIdAttr(req.params.idAttr);
            await res.status(200).json(doc);
        }catch (e) {
            next(e);
        }
    })
    .delete(async (req, res, next) =>{ //DELETE
        try{
            const doc = await templateEntityService.delete(req.params.idAttr);
            await res.status(200).json(doc);
        }catch (e) {
            next(e);
        }
    })
    .put(async (req, res, next) =>{ //EDIT
        try{
            const doc = await templateEntityService.edit(req.params.idAttr, req.body);
            await res.status(200).json(doc);
        }catch (e) {
            next(e);
        }
    });
module.exports = router;