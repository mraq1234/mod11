import { connect } from 'react-redux';
import NoteList from './NoteList';
import { getLaneNotes } from './NoteSelectors';

const mapStateToProps = (state, ownProps) => {
  return {
    notes: getLaneNotes(state, ownProps),
  };
};

export default connect(
  mapStateToProps
)(NoteList);
