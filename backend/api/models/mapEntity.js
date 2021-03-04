const mongoose = require ('mongoose');

const mapEntitySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: String,
    name : {
        type: String,
        required: [true, "Name cannot be blank."],
        maxlength: [30, "Name too long"]
    },
    year : {
        type: Number,
        min : [0, "invalid year"],
        max : [2020, "invalid year"]
    },
    location: { lat: Number, lon: Number }
});

module.exports = mongoose.model("mapEntity", mapEntitySchema);