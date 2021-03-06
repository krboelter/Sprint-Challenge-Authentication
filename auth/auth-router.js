const router = require('express').Router();
const authModel = require("./auth-model")
const bcrypt = require("bcryptjs")

router.post('/register', async (req, res, next) => {
  try {
    if (req.body.password.length < 6) {
        res.status(401).json({
          message: "Password needs to be at least 6 characters"
        })
    } else {
      const newUser = await authModel.add(req.body)
  
      res.status(201).json({
        message: "User has been created",
        newUser
      })
    }
  } catch(err) {
    next(err)
  }
});

router.post('/login', async (req, res, next) => {
  try {
    // console.log(req.session.password)
    const { username, password } = req.body
    const user = await authModel.findBy({ username }).first()
    const passwordValid = await bcrypt.compare(password, user.password)

    if (user && passwordValid) {
      req.session.username = username
      req.session.user = true
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
