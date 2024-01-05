import {Router} from 'express'
import contentController from "../controllers/contentController.js"

const router = Router();

router.get("/", contentController.getContent);

router.post("/", contentController.createContent);

router.put("/", contentController.updateContent);

export default router;
