import { connect } from 'react-redux';
import Lane from './Lane';
import * as laneActions from './LaneActions';
import { createNote, addNoteServ } from '../Note/NoteActions';

// const mapStateToProps = (state, ownProps) => {
//   return {
//     laneNotes: ownProps.lane.notes,
//   };
// };

const mapDispatchToProps = {
  ...laneActions,
  createNote, addNoteServ,
};

export default connect(
  null,
  mapDispatchToProps
)(Lane);
