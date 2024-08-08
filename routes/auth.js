const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../models/user');
const router = express.Router();

router.get('/register', (req, res) => {
  res.render('register');
});

router.post('/register', (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) throw err;
    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hash], (err) => {
      if (err) throw err;
      res.redirect('/auth/login');
    });
  });
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err) throw err;
    if (!user) return res.redirect('/auth/login');
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        req.session.user = user;
        res.redirect('/');
      } else {
        res.redirect('/auth/login');
      }
    });
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
