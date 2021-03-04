const mongoose = require("mongoose");
const TemplateEntity = require("../models/templateEntity");
const AllFacade = require('../dao/AllFacade');

exports.findAll = async () => {
    /*const doc = UserInfo.find()
        .exec()
        .catch((err)=>{
            const error = new Error(err);
            error.status = 500;
            throw error;
        });
    return doc;*/
    return await AllFacade.find(TemplateEntity);
}

exports.create = async (te) => {
    /*const newUser = new UserInfo({
        email: user.email,
        name : user.name,
        city : user.city,
        tag: user.tag,
        creditCard : user.creditCard
    });
    return newUser
        .save()
        .catch((err)=>{
            const error = new Error(err);
            error.status = 500;
            throw error;
        });*/
    return await AllFacade.create(TemplateEntity, te);
}

//Filter
exports.findByStrAttr = async (str) => {
    /*const doc = await UserInfo
        .find({email: email})
        .exec()
        .catch((err)=>{
            const error = new Error(err);
            error.status = 500;
            throw error;
        });

    if (doc) {
        return doc;
    } else {
        const error = new Error("id = " + email + " not found");
        error.status = 404;
        throw error;
    }*/
    return await AllFacade.findQuery(TemplateEntity, {strAttr: str});
}

exports.findByUser = async (user) =>{
    return await AllFacade.findQuery(TemplateEntity, {user: user});
}

exports.findByIdAttr = async (idAttr) => {
    /*const doc = await UserInfo
        .find({city: city})
        .exec()
        .catch((err)=>{
            const error = new Error(err);
            error.status = 500;
            throw error;
        });

    if (doc) {
        return doc;
    } else {
        const error = new Error("there are no users from " + city);
        error.status = 404;
        throw error;
    }*/
    return await AllFacade.findQuery(TemplateEntity, {idAttr: idAttr});
}

exports.delete = async (idAttr) => {
    return TemplateEntity
        .deleteOne({idAttr: idAttr})
        .exec()
        .catch((err)=>{
            const error = new Error(err);
            error.status = 500;
            throw error;
        });
};

exports.edit = async (idAttr, te) => {
    return TemplateEntity
        .updateOne({idAttr: idAttr}, {$set: te})
        .exec()
        .catch((err)=>{
            const error = new Error(err);
            error.status = 500;
            throw error;
        });
};