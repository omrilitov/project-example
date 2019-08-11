import React from 'react';
import {observer} from 'mobx-react';

import {
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

const TodoListItem = props => {
  const {
    divider,
    onCheckBoxToggle,
    checked,
    text,
    onButtonClick
  } = props;

  return (
    <ListItem divider={divider}>
      <Checkbox
        onClick={onCheckBoxToggle}
        checked={checked}
        disableRipple
      />
      <ListItemText primary={text} />
      <ListItemSecondaryAction>
        <IconButton aria-label="Delete Todo" onClick={onButtonClick}>
          <DeleteOutlined />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default observer(TodoListItem);
