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

module.exports = {
  newQuestion
}