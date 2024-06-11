const mongoose = require('mongoose');

const blogschema = new mongoose.Schema({
    Blog: {
        type: String,
        required: true
    },
    Paragraph: {
        type: String,
        required: true
    },
    Image: { 
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Blog", blogschema);
