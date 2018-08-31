async function feed(parent, args, context, info) {
  const queriedQuestions = await context.db.query.questions(
    {}, `{ id }`
  )

  const countSelectionSet = `
    {
      aggregate {
        count
      }
    }
  `

  const questionsConnection = await context.db.query.questionsConnection({}, countSelectionSet)

  return {
    count: questionsConnection.aggregate.count,
    questionIds: queriedQuestions.map(link => link.id)
  }
}

module.exports = {
  feed
};