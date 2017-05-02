import React, { PropTypes } from 'react';
import Lane from './LaneContainer.js';

const Lanes = (props) => {
  return (
    <div className="lanes">
      {
        props.lanes.map(lane => <Lane className="lane" key={lane.id} lane={lane} />)
      }
    </div>
  );
};

Lanes.propTypes = {
  lanes: PropTypes.array,
};

export default Lanes;
