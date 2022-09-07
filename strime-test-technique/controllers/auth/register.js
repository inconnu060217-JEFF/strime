const userModel = require('../../models/utilisateur')

module.exports.register = async (req, res) => {
  const { username } = req.body
  if (username !== "") {
    try {
      const users = await userModel.create({
        username
      })
      return res.status(201).json({ users: users._id })
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    return res.json({ err: 'Tous les champs doivent être remplis' })
  }
}
