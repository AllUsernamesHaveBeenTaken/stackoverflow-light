/* eslint-disable */

import React from 'react';

const filterContext = React.createContext();
const FilterConsumer = filterContext.Consumer;

class FilterProvider extends React.Component {
  state = {
    filter: ''
  };

  onChangeFilter = text => {
    this.setState({ filter: text });
  }

  render() {
    const { filter } = this.state;
    return (
      <filterContext.Provider value={{ filter: filter, onChangeFilter: this.onChangeFilter }}>
        {this.props.children}
      </filterContext.Provider>
    );
  }
}
export { FilterProvider, FilterConsumer };
