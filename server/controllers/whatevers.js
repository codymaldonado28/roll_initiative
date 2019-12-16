require('../models/whatever')

const mongoose = require('mongoose'),
    Whatever = mongoose.model("Whatever");

module.exports = {
    index: (req, res) => {
        Whatever.find()
            .then(whatevers => res.json({ results: whatevers }))
            .catch(err => res.json({ errors: err.errors }))
    },
    create: (req, res) => {
        Whatever.create(req.body)
            .then(whatever => res.json({ results: whatever }))
            .catch(err => res.json({ errors: err.errors }))

    },
    show: (req, res) => {
        Whatever.findById(req.params.id)
            .then(whatever => res.json({ results: whatever }))
            .catch(err => res.json({ errors: err.errors }))

    },
    update: (req, res) => {
        Whatever.findOneAndUpdate({_id: req.params.id}, req.body, {runValidators:true, useFindAndModify:false})
            .then(whatever => res.json({ results: whatever }))
            .catch(err => res.json({ errors: err.errors }))
    },
    destroy: (req, res) => {
        Whatever.deleteOne({_id: req.params.id})
            .then(whatever => res.json({ results: whatever }))
            .catch(err => res.json({ errors: err.errors }))
    }

}