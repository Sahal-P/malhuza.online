import {Router} from 'express'
import authMiddleware from '../middlewares/authMiddleware.js'
import contentRoutes from './contentRoutes.js'

const router = Router();
// router.use(authMiddleware);


router.use('/content', contentRoutes);

export default router;
