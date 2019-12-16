require('../models/character')

const mongoose = require('mongoose'),
    Character = mongoose.model("Character");

module.exports = {
    index: (req, res) => {
        Character.find()
            .then(characters => res.json({ results: characters }))
            .catch(err => res.json({ errors: err.errors }))
    },
    create: (req, res) => {
        Character.create(req.body)
            .then(character => res.json({ results: character }))
            .catch(err => res.json({ errors: err.errors }))

    },
    show: (req, res) => {
        Character.findById(req.params.id)
            .then(character => res.json({ results: character }))
            .catch(err => res.json({ errors: err.errors }))

    },
    update: (req, res) => {
        Character.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators:true, useFindAndModify:false})
            .then(character => res.json({ results: character }))
            .catch(err => res.json({ errors: err.errors }))
    },
    destroy: (req, res) => {
        Character.deleteOne({_id: req.params.id})
            .then(character => res.json({ results: character }))
            .catch(err => res.json({ errors: err.errors }))
    }

}