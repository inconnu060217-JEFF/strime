const produitModel = require('../../models/panier')

module.exports.createProduit = async (req, res) => {
  // verifier si la nom et quantité du produit sont bien informés
    if(req.body.produitname && req.body.quantity && req.body.clientId) {
        const produit = new produitModel({
            produitname: req.body.produitname,
            quantity: req.body.quantity,
            clientId: req.body.clientId,
          })
          try {
            const nouveauPanier = await produit.save()
            return res.status(201).json(nouveauPanier)
          } catch (e) {
            res.status(500).json(err)
          }
    } else {
        return res.json({ err: "Le nom et la quantité du produit sont obligatoire !" })
    }
  
}
