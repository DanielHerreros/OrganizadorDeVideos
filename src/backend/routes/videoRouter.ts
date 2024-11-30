import Express from 'express';
import { Video } from '../types/Video.js'; // Corrected the import path to match the correct file name
import { newVideo, getAllVideos, getVideo, deleteVideo, updateVideo } from '../controllers/videoController.js'; // Ensure these functions are exported from videoController.js
import { ApiResult } from '../types/ApiResult.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { validateNumericParams } from '../middlewares/validateNumericParams.js';

const videoRouter = Express.Router();

videoRouter.get("/", isLoggedIn, async (req: Express.Request, res: Express.Response) => {
    const result: ApiResult = await getAllVideos();
    res.status(result.statusCode).json(result.data);
});

videoRouter.get("/:id", isLoggedIn, validateNumericParams, async (req: Express.Request, res: Express.Response) => {
    const result: ApiResult = await getVideo(req.params.id);
    res.status(result.statusCode).json(result.data);
});
videoRouter.post("/", isLoggedIn, isAdmin, async (req: Express.Request, res: Express.Response) => {
    // Ensure the video object includes all required properties, including userId
    const video: Video = { 
        userId: req.user.id, // Assuming req.user.id is available from isLoggedIn middleware
        title: req.body.title, 
        description: req.body.description, 
        videoUrl: req.body.videoFile
    };
    const result: ApiResult = await newVideo(video);
    res.status(result.statusCode).json({ message: result.message });
});

videoRouter.delete("/:id", isLoggedIn, isAdmin, validateNumericParams, async (req: Express.Request, res: Express.Response) => {
    const result: ApiResult = await deleteVideo(req.params.id);
    res.status(result.statusCode).json({ message: result.message });
});

videoRouter.put("/:id", isLoggedIn, validateNumericParams, async (req: Express.Request, res: Express.Response) => {
    const video: Video = { 
        id: req.params.id, 
        title: req.body.title, 
        description: req.body.description, 
        file_path: req.body.videoFile 
    };
    const result: ApiResult = await updateVideo(video);
    res.status(result.statusCode).json({ message: result.message });
});

export default videoRouter;