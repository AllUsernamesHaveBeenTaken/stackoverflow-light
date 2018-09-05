import React, { PureComponent } from 'react';

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

const answer = {
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

class QuestionDetail extends PureComponent {
  state = {};

  render() {
    return (
      <div style={wrapper}>
        <div style={innerWrapper}>
          <div style={questionWrapper}>
            <div style={smallRightInfo}>
              <p>asked by seppesnoeck</p>
              <p>0 seconds ago</p>
            </div>
            <p style={titleStyle}>Ik ben een dikke vette title</p>
            <p style={descriptionStyle}>
              Ik ben zijn dikke vette beschrijving. Ik ben zijn dikke vette beschrijving. Ik ben
              zijn dikke vette beschrijving. Ik ben zijn dikke vette beschrijving. Ik ben zijn dikke
              vette beschrijving. Ik ben zijn dikke vette beschrijving. Ik ben zijn dikke vette
              beschrijving. Ik ben zijn dikke vette beschrijving.
            </p>
            <div style={voteWrapper}>
              <p style={{ ...voteItem, cursor: 'pointer' }}>upvote</p>
              <p style={voteItem}>0</p>
              <p style={{ ...voteItem, cursor: 'pointer' }}>downvote</p>
            </div>
          </div>
          <div>
            <div style={answer}>
              <p>
                Ik ben een antwoord. Ik ben een antwoord. Ik ben een antwoord. Ik ben een antwoord.
                Ik ben een antwoord. Ik ben een antwoord. Ik ben een antwoord. Ik ben een antwoord.
                Ik ben een antwoord. Ik ben een antwoord. Ik ben een antwoord. Ik ben een antwoord.
                Ik ben een antwoord.
              </p>
              <div style={answerFooter}>
                <div style={{ display: 'flex' }}>
                  <p style={{ ...voteItem, cursor: 'pointer' }}>upvote</p>
                  <p style={voteItem}>0</p>
                  <p style={{ ...voteItem, cursor: 'pointer' }}>downvote</p>
                </div>
                <div style={smallRightInfo}>
                  <p>answered by seppesnoeck</p>
                  <p>0 seconds ago</p>
                </div>
              </div>
            </div>
            <div style={answer}>
              <p>
                Ik ben een antwoord. Ik ben een antwoord. Ik ben een antwoord. Ik ben een antwoord.
                Ik ben een antwoord. Ik ben een antwoord. Ik ben een antwoord. Ik ben een antwoord.
                Ik ben een antwoord. Ik ben een antwoord. Ik ben een antwoord. Ik ben een antwoord.
                Ik ben een antwoord.
              </p>
              <div style={answerFooter}>
                <div style={{ display: 'flex' }}>
                  <p style={{ ...voteItem, cursor: 'pointer' }}>upvote</p>
                  <p style={voteItem}>0</p>
                  <p style={{ ...voteItem, cursor: 'pointer' }}>downvote</p>
                </div>
                <div style={smallRightInfo}>
                  <p>answered by seppesnoeck</p>
                  <p>0 seconds ago</p>
                </div>
              </div>
            </div>
            <div style={inputWrapper}>
              <p style={inputTitle}>Propose an answer</p>
              <textarea
                style={input}
                rows={10}
                name="answer"
                type="text"
                placeholder="Propose a correct answer to the question."
              />
              <button type="button" style={button}>
                Answer
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuestionDetail;
