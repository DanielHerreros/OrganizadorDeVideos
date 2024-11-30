import Express from 'express';
import userRouter from './userRouter.js';import { Pool } from 'pg'; 
import videoRouter from './videoRouter.js';

const pool = new Pool();


const apiRouter = Express.Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/videos", videoRouter);

export default apiRouter;