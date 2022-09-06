const produitModel = require('../../models/panier')

module.exports.createProduit = async (req, res) => {
  // verifier si la nom et quantité du produit sont bien informés
  if (
    req.body.produitname &&
    req.body.quantity &&
    req.body.clientId &&
    req.body.price
  ) {
    const soommeTotalProduit = req.body.quantity * req.body.price
    const produit = new produitModel({
      produitname: req.body.produitname,
      quantity: req.body.quantity,
      price: req.body.price,
      prixTotalProduit: soommeTotalProduit,
      clientId: req.body.clientId,
    })
    try {
      const nouveauPanier = await produit.save()
      return res.status(201).json(nouveauPanier)
    } catch (e) {
      res.status(500).json(e)
    }
  } else {
    return res.json({
      err: 'Le nom et la quantité du produit sont obligatoire !',
    })
  }
}
