const Product = require('../models/productModel');
const pdfService = require('../services/pdfService');

exports.createInvoice = async (req, res) => {
  const userId = req.user._id;
  const products = await Product.find({ user: userId });

  const invoiceData = {
    products,
    user: req.user,
    date: new Date().toISOString().split('T')[0],
  };
// console.log("sameer",invoiceData);
  const pdfBuffer = await pdfService.generateInvoicePDF(invoiceData);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
  res.send(pdfBuffer);
};
