import { Router } from 'express';
import { getAll } from '../Controller/courseController.js';

const router = Router();

router.get('/', getAll);

export default router;
