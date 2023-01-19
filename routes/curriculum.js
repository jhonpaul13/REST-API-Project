import express from 'express'
import {getCurriculum, geCurriculums, addCurriculum,
    updateCurriculum, deleteCurriculum} from '../controller/programs.js'
import { verifytoken } from '../middleware/auth.js'


const router = express.Router({mergeParams:true});

router.get('/', verifytoken, getCurriculums)
router.get('/:id', verifytoken, getCurriculum)
router.post('/', verifytoken, addCurriculum)
router.put('/:id', verifytoken, updateCurriculum)
router.delete('/:id', verifytoken, deleteCurriculum)

export default router