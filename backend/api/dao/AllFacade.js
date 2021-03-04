exports.find = async (model) => {
    return model
        .find()
        .exec()
        .catch((err) => {
            errorHandler(err);
        });
};

//Esto se podria mejorar metiendo la query directamente en la consulta de find
exports.findById = async (model, id) => {
    const doc = await model
        .findById(id)
        .exec()
        .catch((err) => {
            errorHandler(err);
        });
    if (doc) {
        return doc;
    } else {
        const error = new Error("id=" + id + " not found");
        error.status = 404;
        throw error;
    }
};

exports.findQuery = async (model, query) => {
    const doc = await model
        .find(query)
        .exec()
        .catch((err) => {
            errorHandler(err);
        });
    if (doc) {
        return doc;
    } else {
        const error = new Error("id=" + id + " not found");
        error.status = 404;
        throw error;
    }
};

exports.create = async (model, object) => {
    const m = new model(object);
    return m.save().catch((err) => {
        errorHandler(err);
    });
};

exports.delete = async (model, id) => {
    return model
        .deleteOne({_id: id})
        .exec()
        .catch((err) => {
            errorHandler(err);
        });
};

exports.deleteAll = async (model) => {
    return model
        .deleteMany({})
        .exec()
        .catch((err) => {
            errorHandler(err);
        });
};

exports.put = async (model, id, object) => {
    console.log(object);
    return model
        .updateOne({_id: id}, {$set: object}, {runValidators: true})
        .exec()
        .catch((err) => {
            errorHandler(err);
        });
};

function errorHandler(err) {
    let error = new Error(err);
    switch (err.name) {
        case "ValidationError":
            error.status = 422;
            break;
        case "CastError":
            error.status = 400;
            break;
        default:
            error.status = 500;
    }
    throw error;
}

exports.errorHandler = errorHandler;
