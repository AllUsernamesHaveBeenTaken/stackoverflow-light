import React from 'react';
import PropTypes from 'prop-types';
import TimeAgo from 'react-timeago';

const wrapper = {
  display: 'flex',
  backgroundColor: '#F7F7F2',
  flexDirection: 'column',
  padding: '10px 20px',
  cursor: 'pointer'
};

const header = {
  display: 'flex',
  marginBottom: 10
};

const headerTag = {
  background: 'linear-gradient(to right, rgba(168,224,255,1) 0%,rgba(107,241,120,1) 100%)',
  borderRadius: 10
};

const headerText = {
  padding: '1px 10px',
  marginRight: 5,
  fontSize: 12
};

const questionWrapper = {
  display: 'flex',
  justifyContent: 'space-between'
};

const question = {
  fontSize: '22px'
};

const dateStyle = {
  fontSize: 12
};

const totalVotes = votes => {
  const totalTrue = votes.filter(vote => vote.isUpVote && vote).length;
  const totalFalse = votes.filter(vote => !vote.isUpVote && vote).length;

  return totalTrue - totalFalse;
};

const QuestionItem = ({ votes, answers, username, date, title, style, id, history }) => (
  <div
    style={{ ...wrapper, ...style }}
    onClick={() => history.push(`/question/${id}`)}
    role="presentation"
  >
    <div style={header}>
      <p style={{ ...headerTag, ...headerText }}>{`${totalVotes(votes)} votes`}</p>
      <p style={{ ...headerTag, ...headerText }}>{`${answers} answers`}</p>
      <p style={{ ...headerText, padding: '0px 10px' }}>{`asked by ${username}`}</p>
    </div>
    <div style={questionWrapper}>
      <div>
        <p style={question}>{title}</p>
      </div>
      <div>
        <TimeAgo style={dateStyle} date={date} />
      </div>
    </div>
  </div>
);

QuestionItem.propTypes = {
  votes: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  answers: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.shape({}),
  history: PropTypes.shape({}).isRequired,
  id: PropTypes.string.isRequired
};

QuestionItem.defaultProps = {
  style: {}
};

export default QuestionItem;
