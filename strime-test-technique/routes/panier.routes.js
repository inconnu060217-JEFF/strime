const router = require("express").Router()
const { editerProduit } = require("../controllers/panier/editerProduit");
const { paniers } = require("../controllers/panier/panier");
const {createProduit} = require("../controllers/panier/produit");
const { supprimerProduit } = require("../controllers/panier/supprimerProduit");
const { validationPanier } = require("../controllers/panier/validationPanier");

router.get("/:id", paniers)
router.post("/produit", createProduit)
router.put("/produit/:id", editerProduit)
router.delete("/produit/:id", supprimerProduit)
router.get("/validation", validationPanier)



module.exports = router;