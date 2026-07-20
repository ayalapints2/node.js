import { Router } from 'express';
import {
  getAll,
  getOne,
  create,
  update,
  remove,
  register,
  unregister
} from '../Controller/studentController.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);
router.post('/:id/courses', register);
router.delete('/:id/courses/:course', unregister);

export default router;
