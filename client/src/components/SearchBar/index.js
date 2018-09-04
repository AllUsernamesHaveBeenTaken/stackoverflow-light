import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { FilterConsumer } from '../../Contexts/FilterContext';

const boxStyle = {
  width: '25%',
  border: 'solid #2E3532 1px',
  borderRadius: 15,
  fontSize: 15,
  padding: '5px 15px',
  outline: 'none'
};

class SearchBar extends PureComponent {
  render() {
    const { history } = this.props;
    return (
      <FilterConsumer>
        {({ filter, onChangeFilter }) => (
          <input
            style={boxStyle}
            type="text"
            value={filter}
            onChange={({ target }) => onChangeFilter(target.value)}
            onKeyPress={({ key }) => key === 'Enter' && history.push('/')}
            placeholder="Search"
          />
        )}
      </FilterConsumer>
    );
  }
}

SearchBar.propTypes = {
  history: PropTypes.shape({}).isRequired
};

export default SearchBar;
