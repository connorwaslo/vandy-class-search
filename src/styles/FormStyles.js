import {makeStyles} from "@material-ui/core";

const formStyles = makeStyles(theme => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },
  input: {
    margin: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(1)
  }
}));

export default formStyles;