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
app.use(cors());

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

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(chalk.blue(`Server running on port ${PORT}`)));
})();
