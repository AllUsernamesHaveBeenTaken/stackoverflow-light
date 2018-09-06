# stackoverflow-light
Interview case for In The Pocket 

## Instalation

This project consists of two main directories: **/server** and **/client**.

Latest working solution is located on the 'develop' branch.

`$ git checkout develop`

- Server instalation

```
$ cd server
$ npm i 
$ node src/index.js
```

- Client instalation

```
$ cd client
$ npm i
$ npm start
```

And you're good to go! 

## Technologies

For this assignment I used Facebook's [React library](https://reactjs.org/) and query language [GraphQL](https://graphql.org/).

### Prisma

### Apollo

## Workflow

1. Analyzed the assignment by marking keywords.
2. Drawed a rough sketch.

![Image of sketch](https://i.imgur.com/NezMLmc.jpg)

3. Wrote functionalities on Post-it's sorted by: back-end, front-end and nice to have's.
   I picked one Post-it at a time in an order that made sense to me to work on.
   
![Image of Post-it's](https://i.imgur.com/rJZTImo.jpg)

## TODO before meeting

This is a list of item I'd like to finish before our meeting.

- [ ] Cache new answers for optimistic UI.
- [ ] Subscribe to new answers.
- [ ] Make an higher order component for components that need authorization.
- [ ] Sort answers on total votes.
- [ ] Redirect routes to '/' if the route does not exists.

## What's not included?

- Update or edit a question.
- Update or edit an answer.

## Known issues

- No optimistic UI nor subscription if a vote gets deleted.

## Reflection
