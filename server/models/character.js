const mongoose = require('mongoose');

const CharacterSchema = new mongoose.Schema({
    user: {
        type: String,
        // required: [true, "Please give your Whatever a title."],
        // minlength: [2, "Your title must be atleast 2 characters long."]

        // If we decide to use a user/login
    },
    name: {
        type: String,
        required: [true, "Your character must have a name or a title to be referred to."],
        minlength: [2, "Character names need to be longer than two letters. Try adding a title to differentiate yourself"]
    },
    description: {
        type: String
    },
    race: {
        type: String,
        required: [true, "You must choose a race."],
    },
    character_class: {
        type: Array,
        arr_of_classes: {
            type: String
        },
        required: [true, "You must have a class to play"]

    },
    skills: {
        type: Array;
    }
    
    spells: {
        type: Array;
    }

    exp: {
        type: Number,
        default: 0,
    },
    inventory: {
        type: Array,
        items: {
            type: String
        }
    },
    stats: {
        type: Array,
        statistics: {
            type: Number
        }
    }
}, {timestamps:true})

mongoose.model("Character", CharacterSchema);