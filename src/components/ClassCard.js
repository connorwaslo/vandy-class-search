import React from 'react';
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const ClassCard = (props) => (
  <Card
    style={{marginTop: '2vh'}}>
    <CardContent>
      <Typography>
        {props.code} - {props.name}
      </Typography>
      <Typography>
        Credits: {props.credits}
      </Typography>
      <Typography>
        AXLE Requirements fulfilled: {props.axle}
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