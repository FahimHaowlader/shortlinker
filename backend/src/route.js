import { Router } from "express";
import { userCourseSearch, fullCourseDetails,getCourseByCreatorId, createCourse, updateCourseInfo, uploadImage, uploadFile, deleteFile, updateCourseMaterials, updateCourseTasks, updateCourseAssessments, updateSuggestedBooks, updateCourseHandbook, deleteCourseHandbook, deleteCourse } from "./controllers/course.controller.js";


import { createUser, updateUserInfo, userLogin, deleteUser, getAllUserSearch, logoutUser , verifyToken } from "./controllers/user.controller.js";

import  verifyJwt from "./middlewares/auth.middleware.js";
import {upload} from "./middlewares/multer.middleware.js";

// Course Bank  version 1 apies

const router = Router();


// ----- define your routes here ----

router.route('/').get((req, res) => res.send('Api verson 1 is running'));   


{/** helper route */}
router.route('/login').post(userLogin);

router.route('/upload/image').post(verifyJwt, upload.single('image') , uploadImage);

router.route('/upload/file').post(verifyJwt, upload.single('file') , uploadFile);

router.route('/delete/file').delete(verifyJwt, deleteFile);

{/** users route */} 

router.route('/users-all-course').post(userCourseSearch);
router.route('/course-details/:courseId').get(fullCourseDetails);


{/** moderators route */} 

router.use(verifyJwt) ; // all routes below this line require authentication

router.route('/courses-by-creator/:creatorId').get(getCourseByCreatorId);

router.route('/create-course').post(createCourse);

router.route('/update-course-info/:courseId').patch(updateCourseInfo);

router.route('/update-course-materials/:courseId').patch(updateCourseMaterials);

router.route('/update-course-tasks/:courseId').patch(updateCourseTasks);

router.route('/update-course-assessments/:courseId').patch(updateCourseAssessments);

router.route('/update-suggested-books/:courseId').patch(updateSuggestedBooks);

router.route('/update-course-handbook/:courseId').patch(updateCourseHandbook);

router.route('/delete-course-handbook/:courseId').delete(deleteCourseHandbook);

router.route('/delete-course/:courseId').delete(deleteCourse);

router.route('/verify-token').get(verifyToken);

router.route ('/logout').post(logoutUser);

{/** admin route */} 

router.route('/create-user').post(createUser);

router.route('/update-user-info/:userId').patch(updateUserInfo);

router.route('/delete-user/:userId').delete(deleteUser);

router.route('/search-users').post( getAllUserSearch);





export default router;


// when we will improve the Course Bank api then we can use this

// Course Bank version 2 apies

// const router = Router();
// ----- define your routes here ----

//  router.get('/', (req, res) => res.send('api verson 2 is running'));



// export {router} ;