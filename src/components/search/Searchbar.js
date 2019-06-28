import React from 'react';
import {connect} from "react-redux";
import {Button, Container, makeStyles} from '@material-ui/core';
import TextField from "@material-ui/core/TextField";
import SearchType from "./SearchType";
import {changeSearchText, changeSearchType} from "../../ducks/actions";

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
        maxWidth='lg'
        className={styles.container}>

        <div style={{alignContent: 'center', textAlign: 'center'}}>
          <div style={{display: 'flex', flexDirection: 'row'}}>
            <SearchType values={this.props.searchType} handleChange={this._handleTypeChange}/>

            <TextField
              label='Search...'
              type='search'
              margin='normal'
              fullWidth
              value={this.props.search}
              onChange={this._handleTextChange}
              style={{width: '50vw'}}
            />
            {showAdd ? <Button color='primary' onClick={() => this.props.addSearch(index + 1)}>Add</Button> : null}
            {showRemove ? <Button color='secondary' onClick={() => this.props.removeSearch(index)}>Remove</Button> : null}
          </div>
        </div>
      </Container>
    );
  };

  _handleTypeChange = event => {
    const {editType, index} = this.props;
    event.preventDefault();

    editType(event.target.value, index);
  };

  _handleTextChange = event => {
    console.log('Typing', event.target.value);
    const {editText, index} = this.props;
    event.preventDefault();

    editText(event.target.value, index);
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editText: (text, index) => {
      dispatch(changeSearchText(text, index));
    },
    editType: (newType, index) => {
      dispatch(changeSearchType(newType, index));
    }
  }
};

Searchbar = connect(null, mapDispatchToProps)(Searchbar);

export default Searchbar;