// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './Home.css';
import TaskList from './TaskList';
import TaskAdder from './TaskAdder';

class Home extends Component {
  props: {
    smallMode: boolean
  }
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <TaskList />
          {!this.props.smallMode ? <TaskAdder /> : ''}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    smallMode: state.smallMode
  };
}

export default connect(mapStateToProps)(Home);
