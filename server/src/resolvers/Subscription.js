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

module.exports = {
  newQuestion,
  newQuestionVote
}