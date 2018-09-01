const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, authorize } = require('../utils')

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


async function login(parent, args, context, info) {
  const user = await context.db.query.user({ where: { email: args.email } }, ` { id password } `)

  if (!user) {
    throw new Error('Credentials are incorrect')
  }

  const valid = await bcrypt.compare(args.password, user.password)

  if (!valid) {
    throw new Error('Credentials are incorrect')
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET)

  return {
    token,
    user,
  }
}


function askQuestion(parent, args, context, info) {
  const userId = authorize(context)
  
  return context.db.mutation.createQuestion(
    {
      data: {
        title: args.title,
        description: args.description,
        askedBy: { connect: { id: userId } }
      }
    },
    info
  )
}

async function voteOnQuestion(parent, args, context, info) {
  const userId = authorize(context)
  
  const questionExists = await context.db.exists.QuestionVote({
    user: { id: userId },
    question: { id: args.questionId }
  })

  if (questionExists) {
    const vote = await context.db.query.questionVotes(
      {
        where: {
          AND: [
            { user: { id: userId } } ,
            { question: { id: args.questionId } }
          ]
        }
      },
      '{ id }'
    )

    return context.db.mutation.deleteQuestionVote(
      {
        where: { id: vote[0].id }
      },
      info
    )
  }

  return context.db.mutation.createQuestionVote(
    {
      data: {
        user: { connect: { id: userId } },
        question: { connect: { id: args.questionId } },
        isUpVote: args.isUpVote
      }
    },
    info
  )
}

module.exports = {
  signup,
  login,
  askQuestion,
  voteOnQuestion
}

