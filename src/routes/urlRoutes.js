import express from 'express';
import {giveAllMapEntries,createShortUrl,redirectToOriginalUrl} from '../controllers/urlController.js'
const router = express.Router();


router.get('/api/urls',giveAllMapEntries);
router.post('/api/urls',createShortUrl);
router.get('/api/:shortUrl',redirectToOriginalUrl);

export default router;