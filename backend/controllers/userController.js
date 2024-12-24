const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO Users (fullName, email, passwordHash) VALUES (?, ?, ?)';
  db.query(query, [fullName, email, hashedPassword], (err) => {
    if (err) return res.status(500).json({ message: 'Error creating user' });
    res.status(201).json({ message: 'User created successfully' });
  });
  
  
};

const login = (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM Users WHERE email = ?';

  db.query(query, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ token, role: user.role });
  });
};

module.exports = { signup, login };
