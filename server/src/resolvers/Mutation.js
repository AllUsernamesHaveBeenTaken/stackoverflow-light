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
  askQuestion
}