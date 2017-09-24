import React from 'react';
import propTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from './UserActions';
import * as userSelectors from './UserSelectors';
import KanbanList from '../Kanban/KanbanList';

// Import Style
import styles from './User.css';

const User = (props) => {
  const { logout, loginRequest } = props.actions;
  return (
    <div className={styles.userLogin}>
      {props.idToken ? <button onClick={logout}>Logout</ button> : <button onClick={loginRequest}>Login</ button>}
      {props.idToken ? <KanbanList selectedKanbanId={props.selectedKanbanId} /> : ':(('}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    idToken: userSelectors.getIdToken(state),
  };
};

const mapDispatchToProps = dispatch => (
  {
    actions: bindActionCreators({ ...userActions }, dispatch),
  }
);

User.propTypes = {
  idToken: propTypes.string,
  selectedKanbanId: propTypes.string,
  loginRequest: propTypes.func,
  logout: propTypes.func,
  actions: propTypes.object,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);

//
