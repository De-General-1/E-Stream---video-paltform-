import express from "express";
import { unsubscribe, deleteUser, getUser, subscibe, update, like, disLike } from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//Update a user
router.put('/:id', verifyToken, update)

//Delete a user
router.delete('/:id',verifyToken, deleteUser)

//get a user 
router.get('/find/:id', getUser)

//Subscribe a user
router.put('/sub/:id',verifyToken, subscibe)


//Unsubscribe a user
router.put('/sub/:id', verifyToken, unsubscribe)

// like a video
router.put('/like/:id', verifyToken, like)

//Dislike a video
router.put('/dislike/:id', verifyToken, disLike)


export default router;