const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    job_title: {
        type: String,
    },
    gender: {   
        type: String,
    },
},
{timestamps: true} // createdAt and updatedAt fields will be added automatically
);

const User = mongoose.model('user', userSchema);

module.exports = User;
