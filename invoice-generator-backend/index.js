const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');

const app = express();

// Define allowed origins
const allowedOrigins = ['https://invoice-generator-frontend-murex.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow requests with no origin (like mobile apps or curl requests)
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/invoices', invoiceRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Mongodb connected");
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
