import React, { PropTypes } from 'react';
import Lanes from '../Lane/Lanes';
import styles from '../Kanban/Kanban.css';
import DevTools from '../App/components/DevTools';

const Kanban = (props) => {
  return (
    <div>
      <DevTools />
      <div>
        <button
          className={styles.AddLane}
          onClick={
            () => {
              props.createLaneServ({
                name: 'New lane',
              }); }}
        >Add lane</button>
        <Lanes lanes={props.lanes} notes={props.notes} />
      </div>
    </div>
  );
};

Kanban.propTypes = {
  createLaneServ: PropTypes.func,
  lanes: PropTypes.array,
  notes: PropTypes.array,
};

export default Kanban;

