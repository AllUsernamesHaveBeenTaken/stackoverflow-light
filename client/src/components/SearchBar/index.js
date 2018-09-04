import React from 'react';

import { FilterConsumer } from '../../Contexts/FilterContext';

const SearchBar = () => (
  <FilterConsumer>
    {({ filter, onChangeFilter }) => (
      <input type="text" value={filter} onChange={({ target }) => onChangeFilter(target.value)} />
    )}
  </FilterConsumer>
);
export default SearchBar;
