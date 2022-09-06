const produitModel = require('../../models/panier')

module.exports.paniers = async (req, res) => {
  // recuperation de tout les produit qui se trouve dans le panier de l'utisateur 
  produitModel.find((err, data) => {
    if (!err) {
      const produits = data.filter(
        (produit) => produit.clientId === req.params.id,
      )
      res.status(200).send(produits)
    } else return res.status(400).json({ error: err.message })
  })
}
