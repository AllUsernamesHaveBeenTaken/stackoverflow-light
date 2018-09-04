import React from 'react';

import { FilterConsumer } from '../../Contexts/FilterContext';

const boxStyle = {
  width: '25%',
  border: 'solid #2E3532 1px',
  borderRadius: 15,
  fontSize: 15,
  padding: '5px 15px',
  outline: 'none'
};

const SearchBar = () => (
  <FilterConsumer>
    {({ filter, onChangeFilter }) => (
      <input
        style={boxStyle}
        type="text"
        value={filter}
        onChange={({ target }) => onChangeFilter(target.value)}
        placeholder="Search"
      />
    )}
  </FilterConsumer>
);
export default SearchBar;
