// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './TaskAdder.css';

export default class TaskAdder extends Component {
  render() {
    return (
      <div>
        <input type="text" className={styles.taskInput} placeholder="Input Task" data-tid="taskInput" />
      </div>
    );
  }
}