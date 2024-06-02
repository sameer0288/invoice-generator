const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http =require("http");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');


dotenv.config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

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

