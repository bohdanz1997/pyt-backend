import bcrypt from 'bcrypt'
import { CustomError, Token, User } from '@features/common'

const createToken = (iterations = 3, sep = "") => {
  let cnt = 0
  const result = []

  while (cnt++ < iterations) {
    result.push(Math.floor(Math.random() * 100000000000).toString(36))
  }

  return result.join(sep)
}

const USER_TOKEN_SIZE = 5
const HASH_SALT = 10

export const userRegister = async (registerData) => {
  const { email, name, password } = registerData

  const usersWithEmail = await User.query().where('email', email)
  if (usersWithEmail.length > 0) {
    throw new CustomError('email_already_exists')
  }

  const createdUser = await User.query().insert({
    name,
    email,
    password: await bcrypt.hash(password, HASH_SALT),
  })

  return {
    userId: createdUser.id,
  }
}

export const userGet = async (token) => {
  const foundToken = await Token.query().findOne({ token })
  if (!foundToken) {
    throw new CustomError('invalid_token')
  }

  const user = await User.query().findById(foundToken.userId)
  if (!user) {
    throw new CustomError('invalid_token')
  }

  return user
}

export const userLogin = async (loginData) => {
  const { email, password } = loginData
  const foundUser = await User.query().findOne({ email })
  if (!foundUser) {
    throw new CustomError('user_not_found')
  }

  const isCorrectPassword = await bcrypt.compare(password, foundUser.password)
  if (!isCorrectPassword) {
    throw new CustomError('bad_credentials')
  }

  const createdToken = await Token.query().insert({
    userId: foundUser.id,
    token: createToken(USER_TOKEN_SIZE, '%'),
  })

  return {
    token: createdToken.token,
  }
}

export const userSessionDrop = async (user, token) => {
  const userId = user.id

  console.log(userId, token)
  if (token) {
    // remove a token
    await Token.query().where({ token, userId }).delete()
  } else {
    // remove all user tokens
    await Token.query().where({ userId }).delete()
  }

  return true
}
