import React from 'react';
import {Button, Container} from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import SearchType from "./SearchType";

class Searchbar extends React.Component {
  render() {
    const {index} = this.props;
    // Todo: Edit SearchType to work correctly with new hierarchy
    return (
      <Container
        maxWidth='sm'
        style={{paddingBottom: '3vh'}}>

        <div style={{marginTop: '18vh', alignContent: 'center', textAlign: 'center'}}>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <SearchType values={this.props.searchType} handleChange={(e) => this.props.handleTypeChange(e, this.props.index)}/>

            <TextField
              label='Search...'
              type='search'
              margin='normal'
              fullWidth
              value={this.props.search}
              onChange={(e) => this.props.handleChange(e, index)}
            />
          </div>
        </div>
      </Container>
    );
  };
}


export default Searchbar;