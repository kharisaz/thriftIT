const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    imageUrl: { type: String },
    user: { type: String }, // Menyimpan User ID pemilik barang
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Product', ProductSchema);