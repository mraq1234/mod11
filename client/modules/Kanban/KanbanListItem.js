import React from 'react';
import propTypes from 'prop-types';

const KanbanListItem = (props) => {
  return (
    <option value={props.kanbanId}>{props.kanbanName}</option>
  );
};

KanbanListItem.propTypes = {
  kanbanId: propTypes.string,
  kanbanName: propTypes.string,
};

export default KanbanListItem;

