const produitModel = require('../../models/panier')
module.exports.editerProduit = async (req, res) => {
// verifier si le produit exist dans la base données

  const produit = await produitModel.findById({ _id: req.params.id })
  if (produit) {
      // verifier si le produit est lier a l'utilisateur avant de le modifier
    if (produit.clientId === req.body.clientId) {
      try {
        produitModel.findByIdAndUpdate(
          req.params.id,
          { $set: { quantity: req.body.quantity } },
          { new: true },
          (err, docs) => {
            if (!err) res.send(docs)
            else console.log('Update error : ' + err)
          },
        )
      } catch (e) {
        res.status(500).json(err)
      }
    } else {
      res.status(500).json({
        err: 'Vous êtes pas aurotiser a modifier la quantité de ce produit !',
      })
    }
  } else {
    res.status(500).json({ err: err })
  }
}
