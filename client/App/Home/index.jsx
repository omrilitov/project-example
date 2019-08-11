import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Shell from '../components/Shell';
import TodoList from '../Todo/TodoList';
import {observable, action} from 'mobx';
import {inject, observer} from 'mobx-react';

const todo = observable({
  items: [{
    text: 'Buy milk',
    checked: false
  }, {
    text: 'Add "Buy milk" to the todo list',
    checked: true
  }],
  checkTodo(idx) {
    this.items[idx].checked = !this.items[idx].checked;
  },
  removeTodo(idx) {
    this.items.splice(idx, 1);
  }
}, {
  checkTodo: action.bound,
  removeTodo: action.bound
});

const Home = props => {
  const {
    items,
    checkTodo,
    removeTodo
  } = todo;

  const {
    auth: {
      logout
    }
  } = props;

  return (
    <Shell>
      <Box display="flex" flexGrow={1} flexDirection="column">
        <Typography variant="h4">Welcome to Project Example</Typography>
        <TodoList onItemRemove={removeTodo} onItemCheck={checkTodo} items={items} />
        <button type="button" onClick={logout}>logout</button>
      </Box>
    </Shell>
  );
};

export default inject('auth')(observer(Home));
