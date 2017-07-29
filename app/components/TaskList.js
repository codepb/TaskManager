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
      <ul className={styles.container} >
        <li><div className="shortcut">0:&nbsp;</div><div className="task">Stop Timing</div></li>
        { this.props.tasks.map((item, i) => <li key={item.id} className={item.Running ? styles.running : ''}><div className="shortcut">{i + 1}:&nbsp;</div><div className="task">{item.task}</div><div className="time">{item.TimeSpent.toFixed(0)}</div></li>) }
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
