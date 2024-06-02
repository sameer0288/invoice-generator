const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS Configuration
const corsOptions = {
  origin: 'https://invoice-generator-frontend-iota.vercel.app', // Update with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true, // Set to true if your requests include cookies or authentication headers
};

app.use(cors(corsOptions));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/invoices', invoiceRoutes);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("Mongodb connected");
  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}).catch((err) => {
  console.log({ err });
  process.exit(1);
});
