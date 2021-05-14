import React from 'react';
import Chip from '@material-ui/core/Chip';




export const Task = ({ task, onCheckboxClick, onDeleteClick  }) => {

  return (<div>
      {/* <input
        type="checkbox"
        //cast to boolean with !!
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      /> */}

      <Chip label={task.text} onDelete={ () => onDeleteClick(task) } color="primary" />
  </div>);
};