import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
// const express = require('express');
// const dotenv = require('dotenv').config();
// const cors = require('cors');

dotenv.config();
const port = process.env.PORT || 6000;

import summonerRoutes from './routes/summonerRoutes';
import matchRoutes from './routes/matchRoutes';
import rankRoutes from './routes/rankRoutes';
import mainRoutes from './routes/mainRoutes';

// const summonerRoutes = require('./routes/summonerRoutes');
// const matchRoutes = require('./routes/matchRoutes');
// const rankRoutes = require('./routes/rankRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// app.get('/api/', (req, res) => {
//   res.json({ 'api-route-main': 'good' });
// });
app.use('/api', mainRoutes);
app.use('/api/summoner', summonerRoutes);
app.use('/api/match', matchRoutes);
app.use('/api/rank', rankRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
