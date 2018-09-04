import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const ASK_QUESTION_MUTATION = gql`
  mutation LoginMutation($title: String!, $description: String!) {
    askQuestion(title: $title, description: $description) {
      id
      title
      description
      createdAt
      askedBy {
        questions {
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

const formCard = {
  display: 'flex',
  padding: 50,
  backgroundColor: '#F7F7F2',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  width: '25%'
};

const input = {
  width: '100%',
  padding: '12px 20px',
  margin: '8px 0',
  boxSizing: 'border-box',
  border: 'solid 1px #2E3532'
};

const button = {
  background: 'linear-gradient(to right, rgba(168,224,255,1) 0%,rgba(107,241,120,1) 100%)',
  width: '100%',
  borderRadius: 10,
  padding: 5,
  fontSize: 15,
  marginTop: 20,
  outline: 'none'
};

const titleStyle = {
  fontSize: 35,
  marginBottom: 20,
  color: '#2E3532',
  alignSelf: 'flex-start',
  display: 'flex'
};

class AskQuestion extends PureComponent {
  state = { title: '', description: '' };

  render() {
    const { title, description } = this.state;

    return (
      <div style={wrapper}>
        <div style={formCard}>
          <p style={titleStyle}>Ask a question</p>
          <input
            style={input}
            value={title}
            name={title}
            onChange={({ target }) => this.setState({ title: target.value })}
            type="text"
            placeholder="What is your question?"
          />
          <textarea
            style={input}
            rows={10}
            value={description}
            name={description}
            onChange={({ target }) => this.setState({ description: target.value })}
            type="text"
            placeholder="Explain your question more in detail."
          />
          <Mutation mutation={ASK_QUESTION_MUTATION} variables={{ title, description }}>
            {mutation => (
              <button onClick={mutation} type="button" style={button}>
                Ask question
              </button>
            )}
          </Mutation>
        </div>
      </div>
    );
  }
}

export default AskQuestion;
