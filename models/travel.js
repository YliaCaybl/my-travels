const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./sqlite.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS travels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      location TEXT,
      image_url TEXT,
      cost REAL,
      heritage_sites TEXT,
      places_to_visit TEXT,
      ratings TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);
});

module.exports = db;
