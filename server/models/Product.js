// server/models/Product.js
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
  }],
  ratings: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    review: String
  }],
  averageRating: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  onSale: {
    type: Boolean,
    default: false
  },
  salePrice: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

// Calculate average rating before saving
productSchema.pre('save', function(next) {
  if (this.ratings.length > 0) {
    this.averageRating = this.ratings.reduce((acc, item) => acc + item.rating, 0) / this.ratings.length;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
  