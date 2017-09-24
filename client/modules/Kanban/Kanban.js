import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import propTypes from 'prop-types';
import Lanes from '../Lane/Lanes';
import styles from '../Kanban/Kanban.css';
import Edit from '../../components/Edit';

class Kanban extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }
  componentWillMount() {
    this.props.fetchLanes(this.props.params.id, this.props.idToken);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.fetchLanes(nextProps.params.id, nextProps.idToken);
    }
  }

  render() {
    return (
      <div>
        <Edit
          className={styles.KanbanName}
          editing={this.state.editing}
          value={this.props.kanban.name}
          onValueClick={() => this.setState({ editing: true })}
          onEdit={value => {
            this.props.updateKanbanServ(this.props.kanban.id, value);
            this.setState({ editing: false });
          }}
          onDelete={() => {
            this.props.deleteKanbanServ(this.props.kanban.id);
            browserHistory.push('/');
          }
          }
          deleteButtonTxt="DELETE KANBAN"
        />
        <div>
          <button
            className={styles.AddLane}
            onClick={
              () => {
                this.props.createLaneServ({
                  name: 'New lane',
                }, this.props.kanban.id, this.props.idToken);
              }}
          >
            Add lane
          </button>
          <Lanes
            lanes={this.props.lanes}
            notes={this.props.notes}
            idToken={this.props.idToken}
            kanbanId={this.props.kanban.id}
          />
        </div>
      </div>
    );
  }
}

Kanban.propTypes = {
  idToken: propTypes.string,
  loginRequest: propTypes.func,
  fetchLanes: propTypes.func,
  createLaneServ: propTypes.func,
  updateKanbanServ: propTypes.func,
  deleteKanbanServ: propTypes.func,
  lanes: propTypes.array,
  notes: propTypes.array,
  kanban: propTypes.object,
  params: propTypes.object,
};

export default Kanban;

