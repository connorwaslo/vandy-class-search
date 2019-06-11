import React, {Component} from 'react';
import {Button, Container} from "@material-ui/core";
import Searchbar from './Searchbar';

class FilterSection extends Component {
  state = {
    searches: [''],
    types: ['generalSearch']
  };
  
  render() {
    const {searches, types} = this.state;

    return (
      <Container
        maxWidth='sm'
        style={{paddingBottom: '3vh', textAlign: 'center'}}>
        {this._renderSearches()}

        <Button
          onClick={() => this.props.onSubmit(searches, types)}
          variant='contained'
          color='primary'>
          Submit
        </Button>
      </Container>
    )
  };

  _renderSearches = () => {
    const {searches, types} = this.state;

    return searches.map((search, i) => (
      <Searchbar key={i}
                 onSubmit={this._onSubmit}
                 index={i}
                 search={search}
                 searchType={types[i]}
                 handleChange={this._handleChange}
                 handleTypeChange={this._handleTypeChange}/>
    ));
  };

  _handleChange = (event, i) => {
    let newSearches = this.state.searches;
    newSearches[i] = event.target.value;
    this.setState({
      searches: newSearches
    });
  };

  _handleTypeChange = (event, i) => {
    let newTypes = this.state.types;
    newTypes[i] = event.target.value;
    this.setState({
      types: newTypes
    });
  };
}

export default FilterSection;