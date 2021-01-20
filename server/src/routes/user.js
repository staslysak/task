import { Router } from 'express';

import { jwtMiddleware } from '../utils';
import {
    getSelfController,
    updateUserJobController,
    createUserJobController,
    deleteUserJobController,
} from '../controllers';

const router = Router();

router.get('/user', jwtMiddleware, getSelfController);

router.post('/user/job', jwtMiddleware, createUserJobController);

router.put('/user/job', jwtMiddleware, updateUserJobController);

router.delete('/user/job/:jobId', jwtMiddleware, deleteUserJobController);

export default router;
