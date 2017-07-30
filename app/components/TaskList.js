import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TaskActions from '../actions/Task';
import TaskDisplay from './TaskDisplay';
import styles from './TaskList.css';

class TaskList extends Component {
  interval: number;
  props: {
    tasks: Task[]
  }

  render() {
    return (
      <ul className={styles.container} >
        <li><div className="shortcut">0:&nbsp;</div><div className="task">Stop Timing</div></li>
        { this.props.tasks.map((item, i) => <TaskDisplay key={item.Id} shortcut={i + 1} task={item} />) }
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
