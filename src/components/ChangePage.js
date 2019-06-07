import React from 'react';
import {Container, Button} from "@material-ui/core";

const ChangePage = (props) => (
  <Container maxWidth='sm'>
    {props.page === 1 ? <Button disabled>Back</Button> :
      <Button
        color='primary'
        onClick={props.handleBack}>Back</Button>}
    {props.page < props.numPages ? <Button
        color='primary'
        onClick={props.handleNext}>Next</Button> :
      <Button disabled>Next</Button>}
  </Container>
);

export default ChangePage;