import React from 'react';
import {Button, Container, makeStyles} from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import SearchType from "./SearchType";

class Searchbar extends React.Component {
  render() {
    const {index, showAdd, showRemove} = this.props;
    const styles = makeStyles(theme => ({
      container: {
        paddingBottom: theme.spacing(1)
      }
    }));

    return (
      <Container
        minWidth='md'
        maxWidth='lg'
        className={styles.container}>

        <div style={{alignContent: 'center', textAlign: 'center'}}>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <SearchType values={this.props.searchType} handleChange={(e) => this.props.handleTypeChange(e, this.props.index)}/>

            <TextField
              label='Search...'
              type='search'
              margin='normal'
              fullWidth
              value={this.props.search}
              onChange={(e) => this.props.handleChange(e, index)}
              style={{width: '50vw'}}
            />
            {showAdd ? <Button color='primary' onClick={() => this.props.addSearch(index + 1)}>Add</Button> : null}
            {showRemove ? <Button color='secondary' onClick={() => this.props.removeSearch(index)}>Remove</Button> : null}
          </div>
        </div>
      </Container>
    );
  };
}


export default Searchbar;