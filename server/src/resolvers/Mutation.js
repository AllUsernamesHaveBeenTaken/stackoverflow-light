const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET } = require('../utils')

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  
  const user = await context.db.mutation.createUser({
    data: { ...args, password },
  }, `{ id }`)

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user
  }
}

function askQuestion(parent, args, context, info) {
  return context.db.mutation.createQuestion(
    {
      data: {
        title: args.title,
        description: args.description
      }
    },
    info
  )
}

module.exports = {
  askQuestion,
  signup
}

