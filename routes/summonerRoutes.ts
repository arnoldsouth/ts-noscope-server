import express from 'express';
// const express = require('express');
const router = express.Router();

import {
  getSummonerApi,
  getSummonerProfile,
  // getSummonerExtensive,
} from '../controllers/summonerController';
// const { getSummonerApi, getSummonerProfile, getSummonerExtensive } =
//   require('../controllers/summonerController').default.default;

router.get('/', getSummonerApi);
router.get('/profile/:name', getSummonerProfile);

export default router;
// module.exports = router;
