import React from 'react';
import propTypes from 'prop-types';

import Lane from './LaneContainer.js';
import styles from './Lane.css';

const Lanes = (props) => {
  return (
    <div className={styles.lanes}>
      {
        props.lanes.map(lane => <Lane key={lane.id} lane={lane} />)
      }
    </div>
  );
};

Lanes.propTypes = {
  lanes: propTypes.array,
};

export default Lanes;
