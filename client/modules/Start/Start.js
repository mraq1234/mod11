import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getIdToken } from '../User/UserSelectors';
import { loginRequest } from '../User/UserActions';
import { fetchKanbans } from '../Kanban/KanbanActions';
import User from '../User/UserLogin';

// Import Style
import styles from './Start.css';

const Start = (props) => {
  return (
    <div className={styles.start}>
      <User selectedKanbanId={props.params.id} />
      {props.idToken ? props.children : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { idToken: getIdToken(state) };
};

const mapDispatchToProps = {
  loginRequest, fetchKanbans,
};

Start.propTypes = {
  params: propTypes.object,
  idToken: propTypes.string,
  children: propTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Start);
