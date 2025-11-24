const router = require('express').Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/';
        if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// GET ALL
router.get('/', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) { res.status(500).json(err); }
});

// CREATE (Dengan User ID)
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, price, description, user } = req.body;
        const newProduct = new Product({
            name,
            price,
            description,
            user, // Simpan ID pemilik
            imageUrl: req.file ? `/uploads/${req.file.filename}` : ''
        });
        await newProduct.save();
        res.json(newProduct);
    } catch (err) { res.status(500).json(err); }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(product) {
            if(product.imageUrl) {
                const filePath = path.join(__dirname, '..', product.imageUrl);
                if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
            }
            await Product.findByIdAndDelete(req.params.id);
            res.json({ message: 'Deleted' });
        }
    } catch (err) { res.status(500).json(err); }
});

module.exports = router;