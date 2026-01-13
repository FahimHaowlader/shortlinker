import { Router } from "express";
import { 
    createUser, 
    userLogin, 
    verifyToken, 
    logoutUser ,
    updateUser
} from "./controllers/user.controller.js";

import { 
    getShortLink, 
    createShortLink, 
    deleteShortLink, 
    getAllShortLinks 
} from "./controllers/shortLink.controller.js";

import verifyJwt from "./middlewares/auth.middleware.js";

const router = Router();


router.route("/register").post(createUser);
router.route("/login").post(userLogin);
// router.route("/verify-session").get(verifyJwt, verifyToken);
router.route("/url/:shortCode").get(getShortLink); 
router.route("/update-user").post(updateUser);

// router.use(verifyJwt); 

router.route("/logout").post(verifyJwt, logoutUser);
router.route("/links") .post(createShortLink);   
router.route("/all-links").post(getAllShortLinks);
router.route("/delete-links").delete(deleteShortLink); 

export default router;






