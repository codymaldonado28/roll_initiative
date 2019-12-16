const characters = require('../controllers/characters')

module.exports = (app) => {
    app.get('/api/characters', (req, res) => characters.index(req,res))
    app.post('/api/character/create', (req, res) => characters.create(req,res))
    app.get('/api/character/:id', (req,res) => characters.show(req,res))
    app.put('/api/character/update/:id', (req,res) => characters.update(req,res))
    app.delete('/api/character/destroy/:id', (req,res) => characters.destroy(req,res))
    
}