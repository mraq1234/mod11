import React, { PropTypes, Component } from 'react';
import Edit from '../../components/Edit';
import Note from './Note';

//TODO: move editing mode to Note component
class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  render() {
    const { notes, ...props } = this.props;
    return (
      <ul className="notes">{notes.map((note) =>
        <Note
          id={note.id}
          key={note.id}
        >
          <Edit
            editing={this.state.editing}
            value={note.task}
            onValueClick={(event) => {
              event.stopPropagation();
              this.setState({ editing: true });
            }}
            onEdit={value => {
              props.updateNote(Object.assign({}, note, { task: value }));
              this.setState({ editing: false });
            }}
            onDelete={() => props.deleteNoteServ(note.id, props.laneId)}
          />
        </Note>
      )}</ul>);
  }
};

Notes.propTypes = {
  laneId: PropTypes.string,
  notes: PropTypes.array,
  deleteNote: PropTypes.func,
  updateNote: PropTypes.func,
};

export default Notes;
