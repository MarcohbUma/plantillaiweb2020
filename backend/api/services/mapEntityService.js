const mongoose = require("mongoose");
const MapEntity = require("../models/mapEntity");
const AllFacade = require("../dao/AllFacade")

exports.findAll = async () => {
    return await AllFacade.find(MapEntity);
}

exports.create = async (me) => {
    const newMapEntity = new MapEntity({
        _id : new mongoose.Types.ObjectId(),
        user: me.user,
        name : me.name,
        year : me.year,
        location : me.location
    });
    return newMapEntity
        .save()
        .catch((err)=>{
            const error = new Error(err);
            error.status = 500;
            throw error;
        });
    //return await AllFacade.create(MapEntity, me);
}

exports.findById = async (id) => {
    return await AllFacade.findById(MapEntity, id);
}

exports.delete = async (id) => {
    return await AllFacade.delete(MapEntity, id);
};

exports.edit = async (id, me) => {
    return await AllFacade.put(MapEntity, id, me)
};

exports.findByUser = async (user) =>{
    return await AllFacade.findQuery(MapEntity, {user: user});
}