import express from "express";
import { unsubscribe, deleteUser, getUser, subscibe, update, like, disLike } from "../controllers/user.js";
import { verifyToken, requireAdmin } from "../verifyToken.js";
import { addVideo, addView, deleteVideo, getByTag, getVideo, random, search, sub, trend } from "../controllers/video.js";

const router = express.Router();

//Add a video
router.post('/', verifyToken, requireAdmin, addVideo)

//Delete a video
router.delete('/:id',verifyToken, deleteVideo)

//get a video 
router.get('/find/:id', getVideo)
// like a video
router.put('/like/:id', verifyToken, like)

//Dislike a video
router.put('/dislike/:id', verifyToken, disLike)

//Dislike a video
router.put('/view/:id', addView)
router.get('/trend', trend)
router.get('/random', random)
router.get('/sub', verifyToken, sub)
router.get('/tags', getByTag)
router.get('/search', search)


export default router;