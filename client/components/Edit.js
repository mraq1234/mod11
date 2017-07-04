import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
  renderDelete = () =>
    <button
      className={styles.delete}
      onClick={this.props.onDelete}
    >×
    </button>;
  renderEdit = () =>
    <input
      type="text"
      autoFocus
      defaultValue={this.props.value}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter}
      selected
    />
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
    const { editing } = this.props;
    return (
      <div>
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

