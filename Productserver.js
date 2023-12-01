const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 9092;
const mongoURI = 'mongodb://127.0.0.1:27017/project';

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files statically

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const productSchema = new mongoose.Schema({
  category: String,
  subcategory: String,
  quantity: Number,
  price: Number,
  offerprice: Number,
  startdate: Date,
  enddate: Date,
  image: String, // Store the image path as a string
});

const ProductModel = mongoose.model('Product', productSchema);

app.post('/api/save-product', upload.single('image'), async (req, res) => {
  try {
    const productData = req.body;
    const product = new ProductModel(productData);

    // If an image is provided, save the image path to the database
    if (req.file) {
      product.image = 'uploads/' + req.file.filename; // Save the image path
    }

    await product.save();
    res.status(201).json({ message: 'Product saved successfully' });
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/get-products', async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
