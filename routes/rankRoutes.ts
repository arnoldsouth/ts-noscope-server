import express from 'express';
// const express = require('express');
const router = express.Router();

import { getRankApi, getCurrentRank } from '../controllers/rankController';
// const { getRankApi, getCurrentRank } = require('../controllers/rankController')
//   .default.default;

router.get('/', getRankApi);
router.get('/current/:name', getCurrentRank);

export default router;
// module.exports = router;
