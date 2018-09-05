function newQuestionSubscribe(parent, args, context, info) {
  return context.db.subscription.question(
    {
      where: {
        mutation_in: ['CREATED']
      }
    },
    info
  )
}

const newQuestion = {
  subscribe: newQuestionSubscribe
}

function newQuestionVoteSubscribe(parent, args, context, info) {
  return context.db.subscription.questionVote(
    {
      where: {
        mutation_in: ['CREATED', 'UPDATED']
      }
    },
    info
  )
}

const newQuestionVote = {
  subscribe: newQuestionVoteSubscribe
}

function newAnswerSubscribe(parent, args, context, info) {
  return context.db.subscription.answer(
    {
      where: {
        mutation_in: ['CREATED']
      }
    },
    info
  )
}

const newAnswer = {
  subscribe: newAnswerSubscribe
}

function newAnswerVoteSubscribe(parent, args, context, info) {
  return context.db.subscription.answerVote(
    {
      where: {
        mutation_in: ['CREATED', 'UPDATED']
      }
    },
    info
  )
}

const newAnswerVote = {
  subscribe: newAnswerVoteSubscribe
}

module.exports = {
  newQuestion,
  newQuestionVote,
  newAnswer,
  newAnswerVote
}