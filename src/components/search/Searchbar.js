import React from 'react';
import {Button, Container} from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import SearchType from "./SearchType";

// Todo: How the fuck can I vertically center this without making it too skinny??
const Searchbar = (props) => (
  <Container
    maxWidth='sm'
    style={{paddingBottom: '3vh'}}>

    <form onSubmit={e => props.onSubmit(e)}>
      <TextField
        label='Search...'
        type='search'
        margin='normal'
        fullWidth
        value={props.search}
        onChange={e => props.handleChange(e)}
        style={{marginTop: '18vh'}}
        />

      <SearchType values={props.searchType} handleChange={props.handleTypeChange} />
      <Button
        type='submit'
        variant='contained'
        color='primary'>
        Submit
      </Button>
    </form>
  </Container>
);

export default Searchbar;