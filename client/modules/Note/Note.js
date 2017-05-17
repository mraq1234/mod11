import React, { PropTypes, Component } from 'react';
import styles from './Note.css';
import Edit from '../../components/Edit';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }
  render() {
    const { note, laneId, ...props } = this.props;
    return (
      <li className={styles.Note} {...this.props}>
        <Edit
          editing={this.state.editing}
          value={note.task}
          onValueClick={() => this.setState({ editing: true })}
          onEdit={value => {
            props.updateNote(note.id, value);
            this.setState({ editing: false });
          }}
          onDelete={() => props.deleteNote(note.id, laneId)}
        />
      </li>
    );
  }
}

Note.propTypes = {
  laneId: PropTypes.string,
  note: PropTypes.object,
  children: PropTypes.any,
};

export default Note;
