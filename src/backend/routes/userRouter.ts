import Express from 'express';
import { User } from '../types/user.js';
import { deleteUser, getAllUsers, getUser, newUser, updateUser } from '../controllers/userController.js';
import { validateNumericParams } from '../middlewares/validateNumericParams.js';
import { ApiResult } from '../types/ApiResult.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { isAdmin } from '../middlewares/isAdmin.js';

const userRouter = Express.Router();

userRouter.get("/", isLoggedIn, async (req: Express.Request, res: Express.Response) => {
    const result:ApiResult = await getAllUsers();
    res.status(result.statusCode).json(result.data);
  });
  
userRouter.get("/:id", isLoggedIn, validateNumericParams, async (req: Express.Request, res: Express.Response) => {
    const result:ApiResult = await getUser(req.params.id);
    res.status(result.statusCode).json(result.data);
  });
 
userRouter.post("/", isLoggedIn, isAdmin, async (req: Express.Request, res: Express.Response) => {
    const user: User = {userName: req.body.username, name: req.body.name, first_surname: req.body.surname, email: req.body.email, password: req.body.password};
    const result: ApiResult = await newUser(user);
    res.status(result.statusCode).json({message: result.message});
});

userRouter.delete("/:id", isLoggedIn, isAdmin, validateNumericParams, async (req: Express.Request, res: Express.Response) => {  
    const result: ApiResult = await deleteUser(req.params.id);
    res.status(result.statusCode).json({message: result.message});
});

userRouter.put("/:id", isLoggedIn, validateNumericParams, async (req: Express.Request, res: Express.Response) => {  
  const user: User = {id: req.params.id, userName: req.body.username, name: req.body.name, first_surname: req.body.surname, email: req.body.email, password: req.body.password};
  const result: ApiResult = await updateUser(user);
  if (result.statusCode==204){
    res.redirect("http://localhost:3000/usersManagement.html");
  } else {
    res.status(result.statusCode).json({message: result.message});
  }
 
});

export default userRouter;