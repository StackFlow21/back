// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { createQuestion, getQuestions } = require('../controllers/userController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Question routes
router.post('/questions', upload.single('file'), createQuestion);
router.get('/questions', getQuestions);

// API routes (duplicate if needed for /api prefix)
router.post('/api/questions', upload.single('file'), createQuestion);
router.get('/api/questions', getQuestions);

// ... your other user routes ...

module.exports = router;