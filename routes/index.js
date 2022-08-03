import { Router } from "express"; 
import {
        indexPage,
        pageNotFound, 
        usPage, 
        travelsPage, 
        testimonialsPage,
        detailPageTravel 
} from "../controller/pages.controller.js";

import {
    saveTestimonial
} from '../controller/testimonialController.js'

const router = Router();


router.get('/', indexPage); 

router.get('/nosotros',usPage);

router.get('/viajes',travelsPage);
router.get('/viajes/:slug',detailPageTravel);

router.get('/testimoniales',testimonialsPage);
router.post('/testimoniales', saveTestimonial);

router.get('/*', pageNotFound);



export default router;