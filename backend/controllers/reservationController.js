const db = require('../config/db');

const createReservation = (req, res) => {
  const { fullName,phoneNumber,roomType, checkInDate, checkOutDate, paymentStatus,date } = req.body;
  const userId = req.user.id;

  const query = 'INSERT INTO Reservations (userId, FullName, Phone, roomType, checkInDate, checkOutDate, paymentStatus, registrationDate) VALUES (?, ?, ?, ?, ?,?,?,?)';
  db.query(query, [userId, fullName,phoneNumber,roomType, checkInDate, checkOutDate, paymentStatus,date], (err) => {
    if (err) return res.status(500).json({ message: 'Error creating reservation' });
    res.status(201).json({ message: 'Reservation created successfully' });
  });
};

const getUserReservations = (req, res) => {
  const userId = req.user.id;

  const query = 'SELECT * FROM Reservations WHERE userId = ?';
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching reservations' });
    res.json(results);
  });
};

const getAllReservations = (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  const query = 'SELECT * FROM Reservations';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: 'Error fetching reservations' });
    res.json(results);
  });
};

module.exports = { createReservation, getUserReservations, getAllReservations };
