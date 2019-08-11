import React from 'react';
import { List, Paper } from '@material-ui/core';
import {observer} from 'mobx-react';

import TodoListItem from './TodoListItem';

const TodoList = props => {
  const {
    items,
    onItemRemove,
    onItemCheck
  } = props;

  return (
    <>
      {items.length > 0 && (
        <Paper style={{ margin: 16 }}>
          <List style={{ overflow: 'auto' }}>
            {items.map((todo, idx) => (
              <TodoListItem
                {...todo}
                key={`TodoItem.${idx}`}
                divider={idx !== props.items.length - 1}
                onButtonClick={() => onItemRemove(idx)}
                onCheckBoxToggle={() => onItemCheck(idx)}
              />
            ))}
          </List>
        </Paper>
      )}
    </>
  );
};

export default observer(TodoList);
