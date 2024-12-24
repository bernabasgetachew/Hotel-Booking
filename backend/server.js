const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Backend is running');
  });
  

app.use('/api/userRoutes', authRoutes);
app.use('/api/reservationRoutes', reservationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

