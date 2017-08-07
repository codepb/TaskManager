import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TaskActions from '../actions/Task';
import TaskDisplay from './TaskDisplay';
import styles from './TaskList.css';

class TaskList extends Component {
  interval: number;
  props: {
    tasks: Task[],
    smallMode: boolean
  }

  render() {
    const runningTask = this.props.tasks.find(t => t.Running);
    let indexRunningTask = 0;
    if (runningTask) {
      indexRunningTask = this.props.tasks.indexOf(runningTask);
    }
    if (this.props.smallMode) {
      return (<ul className={`${styles.container} ${styles.smallMode}`}>{runningTask ?
        <TaskDisplay shortcut={indexRunningTask + 1} task={runningTask} smallMode={this.props.smallMode} />
        : <li><div className={styles.task}>No running tasks</div></li>}</ul>);
    } else {
      return (
        <ul className={styles.container} >
          <li><div className="shortcut">0:&nbsp;</div><div className="task">Stop Timing</div></li>
          { this.props.tasks.map((item, i) => <TaskDisplay key={item.Id} shortcut={i + 1} task={item} smallMode={this.props.smallMode} />) }
        </ul>);
    }
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    smallMode: state.smallMode
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TaskActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
