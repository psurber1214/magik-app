var jwt = require('jsonwebtoken')
const config = require('config')

const Users = require('../model/usersModel')

const auth = async function (req, res, next) {
  console.log('auth starting')

  const token = req.header('Authorization')

  //if they have no token, deny
  if (!token) {
    console.log('denied due to no token')
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  const bearedToken = token.substring(7)

  console.log(bearedToken)

  try {
    const decoded = jwt.decode(bearedToken)

    req.user = decoded.name
    req.exp = decoded.exp

    console.log(`User ${req.user} attempting sign-in`)
    if (!req.user) {
      return res.status(401).json({ msg: 'Not Authorized' })
    }

    const found = await Users.find({ email: req.user })

    if (!found.length) {
      console.log(`No record found for user ${req.user}`)
      return res.status(403).json({ msg: 'Forbidden' })
    }

    next()
  } catch (err) {
    console.log(err)
    res.status(401).json({ msg: 'token is not valid' })
  }
}

module.exports = auth
