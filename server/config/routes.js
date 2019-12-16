const authors = require('../controllers/authors')

module.exports = (app) => {
    app.get('/api/authors', (req, res) => authors.index(req,res))
    app.post('/api/author/create', (req, res) => authors.create(req,res))
    app.get('/api/author/:id', (req,res) => authors.show(req,res))
    app.put('/api/author/update/:id', (req,res) => authors.update(req,res))
    app.delete('/api/author/destroy/:id', (req,res) => authors.destroy(req,res))
    
}