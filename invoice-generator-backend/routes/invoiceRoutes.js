const express = require('express');
const { createInvoice } = require('../controllers/invoiceController');
const { protect } = require('../utils/authMiddleware');
const router = express.Router();

router.post('/generate', createInvoice);

module.exports = router;
