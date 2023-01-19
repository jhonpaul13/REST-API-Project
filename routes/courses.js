import express from 'express'
import {getCourse,getCourses,addCourse,deleteCourse } from '../controllers/courses.js'
import {verifyToken} from '../middleware/auth.js'

const router = express.Router({mergeParams: true})

router.get('/',verifyToken, getCourses)
router.get('/:id',verifyToken, getCourse)
router.post('/',verifyToken, addCourses)
router.put('/:id',verifyToken, updateCourses)
router.delete('/:id',verifyToken, deleteCourses)

export default router