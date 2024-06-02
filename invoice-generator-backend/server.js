const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'https://invoice-generator-frontend-seven.vercel.app'
}));

(async () => {
  const chalk = (await import('chalk')).default;  // Use dynamic import for chalk

  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(chalk.green('Database connected successfully')))
  .catch((err) => console.error(chalk.red('Database connection error:'), err));

  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/invoices', invoiceRoutes);

  // Test route to ensure server is running
  app.get('/', (req, res) => {
    res.send('Hello, server');
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(chalk.blue(`Server running on port ${PORT}`)));
})();
