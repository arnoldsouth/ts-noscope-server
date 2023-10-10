import express from 'express';

const router = express.Router();

import { getMainApi } from '../controllers/mainController';

router.get('/', getMainApi);

export default router;
