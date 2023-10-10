import axios from 'axios';
import { Request, Response } from 'express';

const getMainApi = (req: Request, res: Response) => {
  res.status(200).json({ 'api-route-main': 'good' });
};

export { getMainApi };
