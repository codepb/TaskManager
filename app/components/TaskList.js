import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TaskActions from '../actions/Task';
import styles from './TaskList.css';

class TaskList extends Component {
  props: {
    tasks: Task[]
  }

  render() {
    return (
      <ul className={styles.taskList} >
        { this.props.tasks.map((item) => <li key={item.keyBinding}>{item.task}</li>) }
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TaskActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
