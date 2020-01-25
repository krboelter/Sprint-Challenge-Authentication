const router = require('express').Router();
const authModel = require("./auth-model")

router.post('/register', async (req, res, next) => {
  try {
    const newUser = await authModel.add(req.body)

    res.status(201).json({
      message: "User has been created",
      newUser
    })
  } catch(err) {
    next(err)
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await usersModel.findBy({ username }).first()
    const passwordValid = await bcrypt.compare(password, user.password)

    if (user && passwordValid) {
      req.session.user = user
      res.status(200).json({
        message: `Welcome ${user.username}`
      })
    } else {
      res.status(401).json({
        message: "Username or Password is incorrect..."
      })
    }

  } catch(err) {
    next(err)
  }
});

module.exports = router;
