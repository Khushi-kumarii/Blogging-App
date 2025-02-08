import express from 'express';
import {login,register,logout, myProfile, getAllAuthors} from '../controllers/userController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router=express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/logout", isAuthenticated, logout);
router.get("/myprofile", isAuthenticated, myProfile);
router.get("/authors", getAllAuthors);


export default router; 