import express from 'express';
import authRoutes from './user';

const router = express.Router();

router.use(authRoutes);

export default router;
