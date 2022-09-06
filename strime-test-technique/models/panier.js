const mongoose = require('mongoose')

const panier = new mongoose.Schema(
  {
    produitname: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: Number
    ,
    prixTotalProduit: Number,
    clientId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('panier', panier)
