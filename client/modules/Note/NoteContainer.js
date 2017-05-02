import { connect } from 'react-redux';
import Notes from './Notes';
import * as noteActions from '../Note/NoteActions';
import { getLaneNotes } from './NoteSelectors';

const mapStateToProps = (state, ownProps) => {
  return {
    notes: getLaneNotes(state, ownProps)
  };
};

const mapDispatchToProps = {
  ...noteActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);
