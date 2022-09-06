const userModel = require('../../models/utilisateur')

module.exports.register = async (req, res) => {
  const { username,  password } = req.body

  if (!(!username || !password)) {
    try {
      const users = await userModel.create({
        username,
        password,
      })

      return res.status(201).json({ users: users._id })
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    return res.json({ err: 'Tous les champs doivent être remplis' })
  }
}
