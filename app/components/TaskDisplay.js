import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TaskActions from '../actions/Task';
import styles from './TaskList.css';

export default class TaskDisplay extends Component {
  interval: number;
  props: {
    task: Task,
    shortcut: number,
    smallMode: boolean
  }
  constructor(props) {
    super(props);
    this.state = {
      timeSpent: this.displayTime(props.task.currentTimeSpent())
    };
    this.setupInterval(props);
  }

  componentWillReceiveProps(nextProps) {
    this.setupInterval(nextProps, this.props);
  }
  componentWillUnmount() {
    if (typeof (this.interval) !== 'undefined') {
      clearInterval(this.interval);
    }
  }

  setupInterval(nextProps, prevProps) {
    if (nextProps.task.Running && (!prevProps || !prevProps.task.Running)) {
      this.interval = setInterval(() => {
        this.tick(nextProps.task.currentTimeSpent());
      }, 1000);
    } else if (!nextProps.task.Running && typeof (this.interval) !== 'undefined') {
      clearInterval(this.interval);
    }
  }

  tick(timeSpent) {
    this.setState({ timeSpent: this.displayTime(timeSpent) });
  }

  displayTime(timeSpent) {
    const hours = Math.floor(timeSpent / 3600);
    const totalSeconds = timeSpent % 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = parseInt(totalSeconds % 60);
    return `${hours}:${this.pad(minutes, 2)}:${this.pad(seconds, 2)}`;
  }

  pad(n, width, z) {
    const zValue = z || '0';
    const nValue = `${n}`;
    return nValue.length >= width ? nValue : new Array((width - nValue.length) + 1).join(zValue) + nValue;
  }

  render() {
    return (
      <li key={this.props.task.Id} className={this.props.task.Running && !this.props.smallMode ? styles.running : ''}>
        <div className={styles.shortcut}>{this.props.shortcut}:&nbsp;</div>
        <div className={styles.task}>{this.props.task.Task}</div>
        <div className={styles.time}>{(this.state.timeSpent)}</div>
      </li>);
  }
}
