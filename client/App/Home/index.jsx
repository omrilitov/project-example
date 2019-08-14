import React, {useEffect} from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Shell from '../components/Shell';
import LoadingSpinner from '../components/LoadingSpinner';
import TodoList from '../Todo/TodoList';
import {observable, action} from 'mobx';
import {inject, observer} from 'mobx-react';

const todo = observable({
  items: [],
  isLoading: false,
  async load() {
    this.isLoading = true;
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.items = [{
      text: 'Buy milk',
      checked: false
    }, {
      text: 'Add "Buy milk" to the todo list',
      checked: true
    }];
    this.isLoading = false;
  },
  checkTodo(idx) {
    this.items[idx].checked = !this.items[idx].checked;
  },
  removeTodo(idx) {
    this.items.splice(idx, 1);
  }
}, {
  load: action.bound,
  checkTodo: action.bound,
  removeTodo: action.bound
});

const Home = props => {
  const {
    isLoading,
    items,
    load,
    checkTodo,
    removeTodo
  } = todo;

  const {
    auth: {
      logout
    }
  } = props;

  useEffect(() => {
    load();
  }, [load]);

  return (
    <Shell>
      <Box display="flex" flexGrow={1} flexDirection="column">
        <Typography variant="h4">Welcome to Project Example</Typography>
        <LoadingSpinner isLoading={isLoading}>
          <TodoList items={items} onItemRemove={removeTodo} onItemCheck={checkTodo} />
        </LoadingSpinner>
        <button type="button" onClick={logout}>logout</button>
      </Box>
    </Shell>
  );
};

export default inject('auth')(observer(Home));
