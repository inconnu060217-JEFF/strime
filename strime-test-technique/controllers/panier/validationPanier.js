const produitModel = require('../../models/panier')
const userModel = require('../../models/utilisateur')

module.exports.validationPanier = async (req, res) => {
  // calculer la somme global de tout les produts se trouvant dans le panier
  const calculPrixAllProduits = (allProduit) => {
    const allProduits = allProduit
    let prix = 0
    for (let i = 0; i < allProduits.length; i++) {
      prix += allProduit[i].prixTotalProduit
    }
    return prix
  }
  // verifier si le client existe dans la base de données avant validation
  userModel.findById(req.body.clientId, (err, dataClient) => {
    if (!err) {
      produitModel.find((err, data) => {
        if (!err) {
          // recuperer tout les produits qui se trouve dans le panier lier a l'utilsateur
          const produits = data.filter(
            (produit) => produit.clientId === req.body.clientId,
          )
          const commandeGlobalProduit = [
            { commmande: `commande de : ${dataClient.username}` },
          ]
          for (let i = 0; i < produits.length; i++) {
            const commande = {}
            commande.produit = produits[i].produitname
            commande.quantite = produits[i].quantity
            commande.prix = produits[i].price
            commande.prixTotalProduit = produits[i].prixTotalProduit
            commandeGlobalProduit.push(commande)
          }
          commandeGlobalProduit.push({
            prixTotalCommande: calculPrixAllProduits(produits),
          })
          res.status(200).json(commandeGlobalProduit)
        } else return res.status(400).json({ error: err.message })
      })
    } else {
      res
        .status(400)
        .json({ err: 'Vous êtes avez aucun droit pour mener cette action !' })
      // res.status(400).json({ err: err })
    }
  })
}
