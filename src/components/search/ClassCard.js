import React from 'react';
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const ClassCard = (props) => (
  <Card
    style={{marginTop: '2vh'}}>
    <CardContent>
      <Typography>
        <b>{props.code} - {props.name}</b>
      </Typography>
      <Typography>
        {props.major}
      </Typography>
      <Typography>
        Credits: {props.credits}
      </Typography>
      <Typography>
        {props.axle.join(',') !== '' ?
        'AXLE Requirements fulfilled: ' + props.axle.join() : null}
      </Typography>
      <Typography>
        Pre-reqs: {props.prereqs}
      </Typography>
      <Typography>
        Co-reqs: {props.coreqs}
      </Typography>
    </CardContent>
  </Card>
);

export default ClassCard;