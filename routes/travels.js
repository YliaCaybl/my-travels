const express = require('express');
const db = require('../models/travel');
const router = express.Router();

router.get('/new', (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login');
  res.render('new-travel');
});

router.post('/new', (req, res) => {
  const { title, description, location, image_url, cost, heritage_sites, places_to_visit, ratings } = req.body;
  db.run(`
    INSERT INTO travels (user_id, title, description, location, image_url, cost, heritage_sites, places_to_visit, ratings)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [req.session.user.id, title, description, location, image_url, cost, heritage_sites, places_to_visit, ratings], (err) => {
    if (err) throw err;
    res.redirect('/travels/my-travels');
  });
});

router.get('/my-travels', (req, res) => {
  if (!req.session.user) return res.redirect('/auth/login');
  db.all(`SELECT * FROM travels WHERE user_id = ?`, [req.session.user.id], (err, travels) => {
    if (err) throw err;
    res.render('my-travels', { travels });
  });
});

router.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  db.all(`SELECT * FROM travels WHERE user_id = ?`, [userId], (err, travels) => {
    if (err) throw err;
    res.render('user-travels', { travels });
  });
});

module.exports = router;
