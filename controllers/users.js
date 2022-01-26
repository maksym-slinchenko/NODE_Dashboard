const jwt = require('jsonwebtoken')
const jimp = require('jimp')
const fs = require('fs/promises')
const path = require('path')

require('dotenv').config()

const Users = require('../model/users')
const { HttpCode } = require('../helper/constants')

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const reg = async (req, res, next) => {
  const user = await Users.findByEmail(req.body.email)
  if (user) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: 'Email in use',
    })
  }
  try {
    const newUser = await Users.create(req.body)
    const payload = { id: newUser.id }
    const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' })
    await Users.updateToken(newUser.id, token)
    const {id, email} = newUser
    return res.status(HttpCode.CREATED).json({
     token,
        user:{
          id,
          email
        },
    })
  } catch (e) {
    next(e)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  const user = await Users.findByEmail(email)
  const isValidPassword = await user?.validPassword(password)
  if (!user || !isValidPassword) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Email or password is wrong.',
    })
  }
  const payload = { id: user.id }
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '2h' })
  await Users.updateToken(user.id, token)

  return res.status(HttpCode.OK).json({
   token,
   user: {
        email: user.email
     },
  })
}

const logout = async (req, res, next) => {
  const id = req.user.id
  await Users.updateToken(id, null)
  return res.status(HttpCode.NO_CONTENT).json({})
}

const current = async (req, res, next) => {
  const id = req.user.id
  try {
      const user = await Users.findById(id)
      if (user) {
      return res.status(HttpCode.OK).json({
              email: user.email,
      })
      } else {
          return res.status(HttpCode.NOT_FOUND).json({
              status: 'error',
              code: HttpCode.NOT_FOUND,
              message: `Not found any contact with id: ${id}`,
              data: 'Not Found',
          })
      }
  } catch (e) {
      next(e)
  }
}

module.exports = {
  reg,
  login,
  logout,
  current,
}