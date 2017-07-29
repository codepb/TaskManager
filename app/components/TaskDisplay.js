import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TaskActions from '../actions/Task';
import styles from './TaskList.css';

export default class TaskDisplay extends Component {
  interval: number;
  props: {
    task: Task,
    shortcut: number
  }
  constructor(props) {
    super(props);
    this.state = {
      timeSpent: props.task.TimeSpent
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.task.Running && !prevProps.task.Running) {
      this.interval = setInterval(() => {
        this.tick(this.props.task.currentTimeSpent());
      }, 1000);
    } else if (!this.props.task.Running && typeof (this.interval) !== 'undefined') {
      clearInterval(this.interval);
    }
  }
  componentWillUnmount() {
    if (typeof (this.interval) !== 'undefined') {
      clearInterval(this.interval);
    }
  }

  tick(timeSpent) {
    this.setState({ timeSpent });
  }

  render() {
    return <li key={this.props.task.id} className={this.props.task.Running ? styles.running : ''}><div className="shortcut">{this.props.shortcut}:&nbsp;</div><div className="task">{this.props.task.task}</div><div className="time">{this.state.timeSpent.toFixed(0)}</div></li>;
  }
}
