const mongoose = require('mongoose');

const WhateverSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please give your Whatever a title."],
        minlength: [2, "Your title must be atleast 2 characters long."]
    }
}, {timestamps:true})

mongoose.model("Whatever", WhateverSchema);