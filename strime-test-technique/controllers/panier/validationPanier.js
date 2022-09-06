const produitModel = require('../../models/panier')
const userModel = require('../../models/utilisateur')

module.exports.validationPanier = async (req, res) => {
    // verifier si le client existe dans la base de données avant validation
  userModel.findById(req.body.clientId, (err, dataClient) => {
    if (!err) {
      produitModel.find((err, data) => {
        if (!err) {
            // recuperer tout les produits qui se trouve dans le panier lier au utilsateur
          const produits = data.filter(
            (produit) => produit.clientId === req.body.clientId,
          )
          const tableauCommande = [{ commmande:  `commande de : ${dataClient.username}`}]
          for (let i = 0; i < produits.length; i++) {
            const commande = {}
            commande.produit = produits[i].produitname
            commande.quantity = produits[i].quantity
            tableauCommande.push(commande)
          }
          res.status(200).send(tableauCommande)
        } else return res.status(400).json({ error: err.message })
      })
    } else return res.status(400).json({ err: err.message })
  })
}
