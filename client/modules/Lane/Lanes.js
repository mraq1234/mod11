import React, { PropTypes } from 'react';
import Lane from './LaneContainer.js';

const Lanes = (props) => {
  return (
    <div className="lanes">{props.lanes.map(lane => {
      const newLane = lane;
      newLane.editing = false;
      return (<Lane className="lane" key={lane.id} lane={newLane} />);
    }
    )}</div>
  );
};

Lanes.propTypes = {
  lanes: PropTypes.array,
};

export default Lanes;
