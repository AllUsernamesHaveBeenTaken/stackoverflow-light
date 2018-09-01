const jwt = require('jsonwebtoken')

const APP_SECRET = 'JWT-C453ITP'

function authorize(context) {
  const AuthorizationHeader = context.request.get('Authorization')
  if (AuthorizationHeader) {
    const token = AuthorizationHeader.replace('Bearer ', '')
    const { userId } = jwt.verify(token, APP_SECRET)
    return userId
  }

  throw new Error('Not authenticated')
}

module.exports = {
  APP_SECRET,
  authorize
}