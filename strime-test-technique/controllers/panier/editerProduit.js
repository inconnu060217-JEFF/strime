const produitModel = require('../../models/panier')
module.exports.editerProduit = async (req, res) => {
  // verifier si le produit exist dans la base données

  produitModel.findById(req.params.id, (err, dataProduit) => {
    if (!err) {
      // verifier si le produit est lier a l'utilisateur avant de le modifier
      if (dataProduit.clientId === req.body.clientId) {
        try {
          produitModel.findByIdAndUpdate(
            req.params.id,
            {
              $set: {
                quantity: req.body.quantity,
                prixTotalProduit: req.body.quantity * dataProduit.price,
              },
            },
            { new: true },
            (err, docs) => {
              if (!err) res.json(docs)
              else console.log('Erreur : ' + err)
            },
          )
        } catch (e) {
          res.status(500).json(e)
        }
      } else {
        res.status(500).json({
          err: 'ous êtes avez aucun droit pour mener cette action !',
        })
      }
    } else {
      res.status(500).json({ err: "produit introuvable !" })
      // res.status(500).json({ err: err })
    }
  })
}
