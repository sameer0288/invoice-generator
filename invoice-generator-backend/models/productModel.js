const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  qty: Number,
  rate: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Product', productSchema);
