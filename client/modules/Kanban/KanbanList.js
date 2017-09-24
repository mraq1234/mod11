import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import propTypes from 'prop-types';
import { fetchKanbans, createKanbanServ } from './KanbanActions';
import { fetchLanes } from '../Lane/LaneActions';
import { getIdToken } from '../User/UserSelectors';
import KanbanListItem from './KanbanListItem';


class KanbanList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKanbanId: 'default',
    };
  }

  componentWillMount() {
    this.props.fetchKanbans(this.props.idToken);
  }

  componentDidMout() {
    this.setState({ selectedKanbanId: this.props.selectedKanbanId });
  }

  navigateToPage(kanbanId) {
    browserHistory.push(`/kanban/${kanbanId}`);
    this.setState({ selectedKanbanId: kanbanId });
  }

  createKanban() {
    this.props.createKanbanServ({ name: 'NEW KANBAN' }, this.props.idToken).then(val => {
      this.navigateToPage(val);
    });
  }

  render() {
    const { selectedKanbanId, kanbans } = this.props;
    return (
      <div>
        <select onChange={event => this.navigateToPage(event.target.value)} value={this.props.selectedKanbanId || 'default'}>
          <option value="default" disabled hidden>Choose KANBAN</option>
          {kanbans.map(kanban => <KanbanListItem key={kanban.id} kanbanId={kanban.id} kanbanName={kanban.name} selectedKanbanId={selectedKanbanId} />)}
        </select>
        <button onClick={() => this.createKanban()}>ADD NEW KANBAN</button>
      </div>
    );
  }
}
KanbanList.propTypes = {
  idToken: propTypes.string,
  fetchKanbans: propTypes.func,
  createKanbanServ: propTypes.func,
  updateKanbanServ: propTypes.func,
  kanbans: propTypes.array,
  selectedKanbanId: propTypes.string,
};

const mapStateToProps = state => ({
  kanbans: Object.values(state.kanbans),
  idToken: getIdToken(state),
});

const mapDispatchToProps = {
  fetchKanbans, fetchLanes, getIdToken, createKanbanServ,
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanList);
