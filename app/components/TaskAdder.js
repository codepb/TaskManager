import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import styles from './TaskAdder.css';
import * as TaskActions from '../actions/Task';

class TaskAdder extends Component {
  props: {
    addTask: (task: string) => void
  }

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addTask(this.state.value);
    this.setState({ value: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={styles.taskInput}>
        <input type="text" placeholder="Input Task" value={this.state.value} onChange={this.handleChange} />
      </form>
    );
  }
}

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(TaskActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskAdder);
