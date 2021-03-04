const mongoose = require ('mongoose');

const templateEntitySchema = mongoose.Schema({
    idAttr: {
        type: String,
        required: [true, "templateEntity must have a scientific name"],
        unique : [true, "there is another templateEntity with that attr"]
    },
    user: String,
    name : {
        type: String,
        required: [true, "Name cannot be blank."],
        maxlength: [30, "Name too long"]
    },
    strAttr: String,
    numberAttr : Number,
    enumAttr : {
        type : String,
        enum : ['spring','sun','winter', 'dread']
    },
    nestedAttr : {
        subAttrNumber : Number,
        subAttrStr : String,
    },
    images : [String]
});

module.exports = mongoose.model("templateEntity", templateEntitySchema);