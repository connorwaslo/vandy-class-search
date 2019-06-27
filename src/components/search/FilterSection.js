import React, {Component} from 'react';
import {Button, Container} from "@material-ui/core";
import Searchbar from './Searchbar';

class FilterSection extends Component {
  state = {
    searches: [''],
    types: ['general']
  };
  
  render() {
    const {searches, types} = this.state;

    return (
      <Container
        maxWidth='md'
        style={{paddingTop: '18vh', paddingBottom: '3vh', justifyContent: 'center', textAlign: 'center'}}>
        <form onSubmit={(e) => this.props.onSubmit(e, searches, types)}>
          {this._renderSearches()}

          <Button
            type='submit'
            variant='contained'
            color='primary'>
            Submit
          </Button>
        </form>
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
                 showAdd={true/*i === lastSearch*/}
                 showRemove={i !== 0 || searches.length > 1}
                 addSearch={this._addSearch}
                 removeSearch={this._removeSearch}
                 handleChange={this._handleChange}
                 handleTypeChange={this._handleTypeChange}/>
    ));
  };

  _addSearch = i => {
    let newSearches = this.state.searches;
    let newTypes = this.state.types;

    newSearches.splice(i, 0, '');
    newTypes.splice(i, 0, 'general');

    this.setState({
      searches: newSearches,
      types: newTypes
    });
  };

  _removeSearch = i => {
    let newSearches = this.state.searches;
    let newTypes = this.state.types;

    newSearches.splice(i, 1);
    newTypes.splice(i, 1);

    this.setState({
      searches: newSearches,
      types: newTypes
    });
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
    console.log(i, 'Changing type from', newTypes[i], 'to', event.target.value);
    newTypes[i] = event.target.value;
    this.setState({
      types: newTypes
    });

    console.log('types:', this.state.types);
  };
}

export default FilterSection;