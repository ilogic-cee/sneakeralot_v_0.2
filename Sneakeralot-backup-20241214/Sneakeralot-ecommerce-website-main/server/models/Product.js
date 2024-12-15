const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    required: true,
    enum: ['Running', 'Basketball', 'Casual', 'Athletic', 'Limited Edition', 'High-Tops']
  },
  brand: {
    type: String,
    required: true,
    enum: ['Nike', 'Adidas', 'Jordan', 'New Balance', 'Puma', 'Under Armour']
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  sizes: [{
    size: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 0
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema); 