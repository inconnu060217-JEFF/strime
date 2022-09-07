const produitModel = require('../../models/panier')
const userModel = require('../../models/utilisateur')

module.exports.paniers = async (req, res) => {
  // verifier si l'utilisateur exist dans la base de données
  userModel.findById(req.params.id, (err, dataClient) => {
    if (!err) {
      if (dataClient !== null) {
        // recuperation de tout les produit qui se trouve dans le panier de l'utisateur
        produitModel.find((err, data) => {
          if (!err) {
            const produits = data.filter(
              (produit) => produit.clientId === req.params.id,
            )
            if(produits.length !== 0) {
              res.status(200).send(produits)
            } else {
            res.status(500).json({ err: "Votre panier est vide !" })
            }
          } else return res.status(400).json({ error: err.message })
        })
      } else {
        return res.status(400).json({ error: 'Client non identifier !' })
      }
    } else {
      return res.status(400).json({ error: err.message })
    }
  })
}
