import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import _ from 'lodash';

import Lane from './LaneContainer.js';
import styles from './Lane.css';

const Lanes = (props) =>
  <div className={styles.lanes}>
    {props.lanes.map(lane => <Lane key={lane.id} lane={lane} idToken={props.idToken} lanesIds={props.lanesIds} kanbanId={props.kanbanId} />)}
  </div>;

Lanes.propTypes = {
  lanes: propTypes.array,
  lanesIds: propTypes.array,
  idToken: propTypes.string,
  kanbanId: propTypes.string,
};

const getLanesId = (lanes) => {
  const lanesIds = [];
  _.forEach(lanes, (val) => {
    lanesIds.push(val._id);
  });
  return lanesIds;
};

const mapStateToProps = (state) => {
  return {
    lanesIds: getLanesId(state.lanes),
  };
};

export default connect(
  mapStateToProps
)(Lanes);
