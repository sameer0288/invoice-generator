const express = require('express');
const { createInvoice } = require('../controllers/invoiceController');
const { protect } = require('../utils/authMiddleware');
const router = express.Router();

router.post('/generate', protect, createInvoice);

module.exports = router;
