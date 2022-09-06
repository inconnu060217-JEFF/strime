const produitModel = require('../../models/panier')

module.exports.supprimerProduit = async (req, res) => {
// verifier si le produit exist dans la base données
  const produit = await produitModel.findById({ _id: req.params.id })
  if (produit) {
    // verifier si le produit est lier a l'utilisateur avant suppression
    if (produit.clientId === req.body.clientId) {
      try {
        produitModel.findByIdAndDelete(req.params.id, (err, data) => {
          if (!err) res.status(200).json({message: " Produit supprimier !"})
          else return res.status(400).json({ err: err.message })
        })
      } catch (err) {
        res.status(500).json(err)
      }
    }
  } else {
    res.status(500).json(err)
  }
}
