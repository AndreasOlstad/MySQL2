const express = require('express');
const router = express.Router();
const db = require('../db');

// Hent alle bøker
router.get('/', (req, res) => {
  db.query('SELECT * FROM books', (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// Legg til ny bok
router.post('/', (req, res) => {
  const { title, author, genre } = req.body;
  db.query('INSERT INTO books (title, author, genre, status) VALUES (?, ?, ?, ?)', 
    [title, author, genre, 'tilgjengelig'], // Standard status er 'tilgjengelig'
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Boken ble lagt til!' });
    });
});

// Rediger bok
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, genre, status } = req.body;
  db.query('UPDATE books SET title = ?, author = ?, genre = ?, status = ? WHERE id = ?', 
    [title, author, genre, status, id], 
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Boken ble oppdatert!' });
    });
});

// Slett bok
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM books WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Boken ble slettet!' });
  });
});

// Hent en spesifikk bok for redigering
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM books WHERE id = ?', [id], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      if (result.length === 0) return res.status(404).json({ error: 'Bok ikke funnet' });
      res.json(result[0]);
    });
  });
   
  // Rediger bok
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, author, genre } = req.body;
    db.query('UPDATE books SET title = ?, author = ?, genre = ? WHERE id = ?',
      [title, author, genre, id],
      (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Bok ikke funnet' });
        res.json({ message: 'Boken ble oppdatert!' });
      });
  });
  
module.exports = router;

