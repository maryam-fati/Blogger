const mongoose = require('mongoose');

const blogschema = new mongoose.Schema({
    Blog: {
        type: String,
        required: true  // Fixed typo: 'require' to 'required'
    },
    Paragraph: {
        type: String,
        required: true
    },
    Image: {  // Fixed typo: 'image' to 'Image' to match frontend field
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Blog", blogschema);
