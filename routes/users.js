const express = require('express');
const db = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
  db.all(`SELECT * FROM users WHERE id != ?`, [req.session.user.id], (err, users) => {
    if (err) throw err;
    res.render('other-users', { users });
  });
});

module.exports = router;
