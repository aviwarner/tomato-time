import React, { Component } from 'react';
import { Table, FormGroup, FormControl, Button } from 'react-bootstrap';
import moment from 'moment';

class Task extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks: [],
      taskText: ''
    };

    this.tasksRef = this.props.firebase.database().ref('tasks');
    this.handleChange = this.handleChange.bind(this);
  }


  componentDidMount() {
    this.tasksRef.on('child_added', snapshot => {
      const task = snapshot.val();
      task.key = snapshot.key;
      this.setState({ tasks: this.state.tasks.concat( task ) })
    });
  }

  handleSubmit(e) {
    if (this.state.taskText) {
      this.tasksRef.push({
        content: this.state.taskText,
        userId: this.props.userId,
        createdAt: Date.now()
      });
    }
    this.setState({taskText: ''});
    e.preventDefault();
  }

  handleChange(e) {
    this.setState({ taskText: e.target.value });
  }

  render() {
    const tasks = this.state.tasks.filter(t => t.userId === this.props.userId).sort(function(a,b) { return b.createdAt - a.createdAt});

    return(
      <section>
        <hr></hr>
        <form onSubmit={ (e) => this.handleSubmit(e) } className="form-inline">
          <FormGroup controlId="formBasicText" className="form-group">
            <FormControl
              type="text"
              value={this.state.taskText}
              placeholder="Add your completed task here"
              onChange={this.handleChange}
              className="form-field"
            />
            <Button type="submit">Submit</Button>
          </FormGroup>
        </form>
        <Table striped>
          <thead>
            <tr>
              <th className="tasks">Task History</th>
              <th className="timestamp">Created</th>
            </tr>
          </thead>
          <tbody>
            { tasks.map( (task, index) =>
              <tr key={index}>
                <td className="tasks">
                  {task.content}
                </td>
                <td className="timestamp">
                  {moment(task.createdAt).from(Date.now())}
                </td>
              </tr>
            )}
          </tbody>
        </Table>

      </section>
    )
  }
}

export default Task;
