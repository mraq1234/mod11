import React, { Component, PropTypes } from 'react';
import styles from './Edit.css';

export default class Edit extends Component {
  checkEnter = (e) => {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  };
  finishEdit = (e) => {
    const value = e.target.value;
    if (this.props.onEdit) {
      this.props.onEdit(value.trim());
    }
  };
  renderDelete = () => {
    return <button className={styles.delete} onClick={this.props.onDelete}>×</button>;
  };
  renderEdit = () => {
    return (
      <input
        type="text"
        autoFocus
        defaultValue={this.props.value}
        onBlur={this.finishEdit}
        onKeyPress={this.checkEnter}
        selected
      />
    );
  };
  renderValue = () => {
    const { value, onDelete, onValueClick } = this.props;

    return (
      <div onClick={onValueClick}>
        <span className={styles.value}>{value}</span>
        {onDelete ? this.renderDelete() : null}
      </div>
    );
  };
  render() {
    const { editing, ...props } = this.props;

    return (
      <div {...props}>
        {editing ? this.renderEdit() : this.renderValue()}
      </div>
    );
  }
}

Edit.propTypes = {
  laneProp: PropTypes.object,
  value: PropTypes.string,
  onEdit: PropTypes.func,
  onValueClick: PropTypes.func,
  onDelete: PropTypes.func,
  editing: PropTypes.bool,
};

