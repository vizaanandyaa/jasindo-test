const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database')


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req,res)=>{
    // db.query("SELECT * FROM data", (err,res)=>{
    //     console.log(res)
    // })
    res.send('Testing')
})

app.get('/items', (req, res) => {
    db.query('SELECT * FROM data', (err, results) => {
        if (err) throw err;
        res.json(results);
        console.log(results)
    });
});

app.get('/items/:id', (req, res) => {
    const { id } = req.params; 
    db.query('SELECT * FROM data WHERE id = ?',[id], (err, results) => {
        if (err) throw err;
        res.json(results[0]);
    });
});

app.post('/create', (req, res) => {
    const { name, age } = req.body;
    db.query('INSERT INTO data (name,age) VALUES (?,?)', [name, age], (err, result) => {
        if (err) {
            console.error('Error inserting item:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ id: result.insertId, name, age });
    });
});

app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
    db.query('UPDATE data SET name = ?, age = ? WHERE id = ?', [name, age, id], err => {
        if (err) {
            console.error('Error updating item:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ id, name, age });
    });
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM data WHERE id = ?', [id], err => {
        if (err) throw err;
        res.json({ message: 'Deleted successfully' });
    });
});



app.listen(4000,()=>{
    console.log('Server run')
})