import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Container} from "@material-ui/core";
import Searchbar from './Searchbar';

class FilterSection extends Component {
  render() {
    const {searches, open} = this.props;
    console.log('Open?', open);

    return (
      <Container
        maxWidth={open ? 'sm' : 'md'}
        style={{paddingTop: '18vh', paddingBottom: '3vh', justifyContent: 'center', textAlign: 'center'}}>
        <form onSubmit={(e) => this.props.onSubmit(e, searches)}>
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
    const {searches} = this.props;

    return searches.map((search, i) => (
      <Searchbar key={i}
                 index={i}
                 search={search.search}
                 searchType={search.type}
                 showAdd={true}
                 showRemove={i !== 0 || searches.length > 1}
      />
    ));
  };
}

const mapStateToProps = state => {
  return {
    searches: state.searches
  }
};

FilterSection = connect(mapStateToProps, null)(FilterSection);

export default FilterSection;