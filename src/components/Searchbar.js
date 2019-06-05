import React from 'react';
import {Button, Container} from '@material-ui/core';
import TextField from "@material-ui/core/TextField";

// Todo: How the fuck can I vertically center this without making it too skinny??
const Searchbar = (props) => (
  <Container
    maxWidth='sm'
    style={{paddingBottom: '3vh'}}>

    <form onSubmit={props.onSubmit}>
      <TextField
        label='Search...'
        type='search'
        margin='normal'
        fullWidth
        value={props.search}
        onChange={e => props.handleChange(e)}
        style={{marginTop: '18vh'}}
        />

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