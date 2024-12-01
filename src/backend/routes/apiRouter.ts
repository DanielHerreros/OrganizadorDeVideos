import Express from 'express';
import userRouter from './userRouter.js';
import videoRouter from './videoRouter.js';
import { verifyToken } from '../middlewares/verifyToken.js';
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool();

const apiRouter = Express.Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/videos", videoRouter);

export default apiRouter;