async function feed(parent, args, context, info) {
  const where = args.filter ? { title_contains: args.filter } : {}

  const queriedQuestions = await context.db.query.questions({ where }, `{ id }`)

  const countSelectionSet = `
    {
      aggregate {
        count
      }
    }
  `

  const questionsConnection = await context.db.query.questionsConnection({ where }, countSelectionSet)

  return {
    count: questionsConnection.aggregate.count,
    questionIds: queriedQuestions.map(question => question.id)
  }
}

module.exports = {
  feed
};