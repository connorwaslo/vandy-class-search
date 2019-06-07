import React from 'react';
import {Container, Button} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const ChangePage = (props) => (
  <Container maxWidth='sm'
    style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
    {props.page === 1 ? <Button disabled>Back</Button> :
      <Button
        color='primary'
        onClick={props.handleBack}>Back</Button>}

    <Typography>{props.page} / {props.numPages}</Typography>

    {props.page < props.numPages ? <Button
        color='primary'
        onClick={props.handleNext}>Next</Button> :
      <Button disabled>Next</Button>}
  </Container>
);

export default ChangePage;