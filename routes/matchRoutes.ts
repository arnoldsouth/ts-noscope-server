import express from 'express';
// const express = require("express");
const router = express.Router();

import { getMatchApi, getMatchHistory } from '../controllers/matchController';
// const {
//   getMatchApi,
//   getMatchHistory,
// } = require('../controllers/matchController');

router.get('/', getMatchApi);
// router.get("/recent/:puuid&:count", getMatchHistory);
router.get('/recent/:name&:count', getMatchHistory);

export default router;
// module.exports = router;
