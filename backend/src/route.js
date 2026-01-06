import { Router } from "express";
import { 
    createUser, 
    userLogin, 
    verifyToken, 
    logoutUser 
} from "/controllers/user.controller.js";

import { 
    getShortLink, 
    createShortLink, 
    deleteShortLink, 
    getAllShortLinks 
} from "/controllers/shortLink.controller.js";

import verifyJwt from "./middlewares/auth.middleware.js";

const router = Router();

// --- AUTH ROUTES ---
// Public routes for registration and login
router.route("/register").post(createUser);
router.route("/login").post(userLogin);
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/verify-session").get(verifyJwt, verifyToken);

// --- SHORT LINK ROUTES ---
// Redirect route: This is usually public so anyone can click a short link
// Example: GET /api/v1/links/shrt.url/my-alias
router.route("/r/:alias").get(getShortLink); 

// --- PROTECTED DASHBOARD ROUTES ---
// These require a valid JWT token
router.use(verifyJwt); // Middleware applied to all routes defined below this line

router.route("/links")
    .get(getAllShortLinks)    // Fetch all links for the logged-in user
    .post(createShortLink);   // Create a new shortened URL

router.route("/links/:id")
    .delete(deleteShortLink); // Delete a specific link by ID

export default router;






