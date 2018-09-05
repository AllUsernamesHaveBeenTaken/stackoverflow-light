import React, { PureComponent } from 'react';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import TimeAgo from 'react-timeago';
import PropTypes from 'prop-types';

const QUESTION_QUERY = gql`
  query QuestionQuery($id: ID!) {
    question(id: $id) {
      id
      title
      createdAt
      description
      votes {
        id
        isUpVote
      }
      askedBy {
        id
        username
      }
      answers {
        id
        createdAt
        content
        votes {
          id
          isUpVote
        }
        answeredBy {
          id
          username
        }
      }
    }
  }
`;

const ANSWER_ON_QUESTION_MUTATION = gql`
  mutation AnswerOnQuestionMutation($questionId: ID!, $content: String!) {
    answerOnQuestion(questionId: $questionId, content: $content) {
      id
      createdAt
      content
      votes {
        id
        isUpVote
      }
      answeredBy {
        id
        username
      }
    }
  }
`;

const NEW_ANSWERS_SUBSCRIPTION = gql`
  subscription {
    newAnswer {
      node {
        id
        createdAt
        content
        votes {
          id
          isUpVote
        }
        answeredBy {
          id
          username
        }
      }
    }
  }
`;

const VOTE_ON_QUESTION_MUTATION = gql`
  mutation VoteOnQuestionMutation($questionId: ID!, $isUpVote: Boolean!) {
    voteOnQuestion(questionId: $questionId, isUpVote: $isUpVote) {
      id
    }
  }
`;

const VOTE_ON_ANSWER_MUTATION = gql`
  mutation VoteOnAnswerMutation($answerId: ID!, $isUpVote: Boolean!) {
    voteOnAnswer(answerId: $answerId, isUpVote: $isUpVote) {
      id
    }
  }
`;

const NEW_QUESTION_VOTE_SUBSCRIPTION = gql`
  subscription {
    newQuestionVote {
      node {
        id
        isUpVote
        question {
          id
          title
          votes {
            id
            isUpVote
          }
          askedBy {
            id
            username
          }
          createdAt
          answers {
            id
            content
            votes {
              id
            }
            createdAt
            answeredBy {
              id
              username
            }
          }
        }
        user {
          id
        }
      }
    }
  }
`;

const wrapper = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: 50
};

const innerWrapper = {
  width: '75%'
};

const titleStyle = {
  fontSize: 35,
  padding: '0px 0px 50px 50px'
};

const descriptionStyle = {
  padding: '0px 50px 50px 50px'
};

const questionWrapper = {
  backgroundColor: '#F7F7F2',
  boxShadow: '0 1px 10px 0 rgba(0, 0, 0, 0.15)'
};

const voteWrapper = {
  display: 'flex',
  padding: '0px 0px 30px 50px'
};

const voteItem = {
  paddingRight: 10
};

const answerStyle = {
  borderBottom: 'solid 1px #A8E0FF',
  marginTop: 30,
  padding: '0px 50px'
};

const smallRightInfo = {
  fontSize: 12,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  padding: 15
};

const answerFooter = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const input = {
  width: '100%',
  boxSizing: 'border-box',
  border: 'solid 1px #2E3532',
  marginTop: 10
};

const inputWrapper = {
  padding: '30px 50px 0px 50px',
  display: 'flex',
  flexDirection: 'column'
};

const inputTitle = {
  fontSize: 20
};

const button = {
  background: 'linear-gradient(to right, rgba(168,224,255,1) 0%,rgba(107,241,120,1) 100%)',
  width: '15%',
  borderRadius: 10,
  padding: 5,
  fontSize: 15,
  marginTop: 20,
  outline: 'none',
  alignSelf: 'flex-end'
};

const totalVotes = votes => {
  const totalTrue = votes.filter(vote => vote.isUpVote && vote).length;
  const totalFalse = votes.filter(vote => !vote.isUpVote && vote).length;

  return totalTrue - totalFalse;
};

class QuestionDetail extends PureComponent {
  state = { answerText: '' };

  postAnswerComplete = () => {
    this.setState({ answerText: '' });
  };

  subscribeToNewAnswers = subscribeToMore => {
    subscribeToMore({
      document: NEW_ANSWERS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newAnswer = subscriptionData.data.newAnswer.node;
        console.log([newAnswer, ...prev.question.answers]);
        const glueAnswers = [newAnswer, ...prev.question.answers];
        return Object.assign({}, prev, {
          question: {
            answers: glueAnswers
          }
        });
      }
    });
  };

  subscribeToNewQuestionVotes = subscribeToMore => {
    subscribeToMore({
      document: NEW_QUESTION_VOTE_SUBSCRIPTION
    });
  };

  render() {
    const { match } = this.props;
    const { answerText } = this.state;
    return (
      <Query query={QUESTION_QUERY} variables={{ id: match.params.id }}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Loading</div>;
          if (error) return <div>Error</div>;

          const { askedBy, createdAt, title, description, answers, id, votes } = data.question;

          this.subscribeToNewAnswers(subscribeToMore);
          this.subscribeToNewQuestionVotes(subscribeToMore);

          return (
            <div style={wrapper}>
              <div style={innerWrapper}>
                <div style={questionWrapper}>
                  <div style={smallRightInfo}>
                    <p>{`asked by ${askedBy.username}`}</p>
                    <TimeAgo date={createdAt} />
                  </div>
                  <p style={titleStyle}>{title}</p>
                  <p style={descriptionStyle}>{description}</p>
                  <div style={voteWrapper}>
                    <Mutation
                      mutation={VOTE_ON_QUESTION_MUTATION}
                      variables={{ questionId: id, isUpVote: true }}
                    >
                      {mutation => (
                        <button
                          onClick={mutation}
                          style={{ ...voteItem, cursor: 'pointer' }}
                          type="button"
                        >
                          upvote
                        </button>
                      )}
                    </Mutation>
                    <p style={voteItem}>{totalVotes(votes)}</p>
                    <Mutation
                      mutation={VOTE_ON_QUESTION_MUTATION}
                      variables={{ questionId: id, isUpVote: false }}
                    >
                      {mutation => (
                        <button
                          onClick={mutation}
                          style={{ ...voteItem, cursor: 'pointer' }}
                          type="button"
                        >
                          downvote
                        </button>
                      )}
                    </Mutation>
                  </div>
                </div>
                <div>
                  {answers.map(answer => (
                    <div key={answer.id} style={answerStyle}>
                      <p>{answer.content}</p>
                      <div style={answerFooter}>
                        <div style={{ display: 'flex' }}>
                          <Mutation
                            mutation={VOTE_ON_ANSWER_MUTATION}
                            variables={{ answerId: answer.id, isUpVote: true }}
                          >
                            {mutation => (
                              <button
                                onClick={mutation}
                                style={{ ...voteItem, cursor: 'pointer' }}
                                type="button"
                              >
                                upvote
                              </button>
                            )}
                          </Mutation>
                          <p style={voteItem}>{totalVotes(answer.votes)}</p>
                          <Mutation
                            mutation={VOTE_ON_ANSWER_MUTATION}
                            variables={{ answerId: answer.id, isUpVote: false }}
                          >
                            {mutation => (
                              <button
                                onClick={mutation}
                                style={{ ...voteItem, cursor: 'pointer' }}
                                type="button"
                              >
                                downvote
                              </button>
                            )}
                          </Mutation>
                        </div>
                        <div style={smallRightInfo}>
                          <p>{`answered by ${answer.answeredBy.username}`}</p>
                          <TimeAgo date={answer.createdAt} />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div style={inputWrapper}>
                    {answers.length <= 0 ? (
                      <p style={inputTitle}>Be the first to answer</p>
                    ) : (
                      <p style={inputTitle}>Propose an answer</p>
                    )}
                    <textarea
                      style={input}
                      rows={10}
                      name="answer"
                      value={answerText}
                      type="text"
                      placeholder="Propose a correct answer to the question."
                      onChange={({ target }) => this.setState({ answerText: target.value })}
                    />
                    <Mutation
                      mutation={ANSWER_ON_QUESTION_MUTATION}
                      variables={{ questionId: id, content: answerText }}
                      onCompleted={() => this.postAnswerComplete()}
                      update={(store, { data: { answerOnQuestion } }) => {
                        const queryData = store.readQuery({
                          query: QUESTION_QUERY,
                          variables: { id }
                        });
                        queryData.question.answers.unshift(answerOnQuestion);
                        console.log(queryData);
                        console.log(id);

                        store.writeQuery({
                          query: QUESTION_QUERY,
                          variables: { id },
                          queryData
                        });
                      }}
                    >
                      {mutation => (
                        <button onClick={mutation} type="button" style={button}>
                          Answer
                        </button>
                      )}
                    </Mutation>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

QuestionDetail.propTypes = {
  match: PropTypes.shape({}).isRequired
};

export default QuestionDetail;
