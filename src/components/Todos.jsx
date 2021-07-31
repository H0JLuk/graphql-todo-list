import React from 'react';
import { observer } from "mobx-react-lite";
import { useQuery } from "@apollo/client";

import { fetchTodosGql } from "../api/todoService";
import TodoItem from "./TodoItem";
import useStore from "../store/useStore";

const Todos = () => {
  const { todos: todoList, loadTodos } = useStore();
  const { loading, error } = useQuery(fetchTodosGql, {
    onCompleted: ({ todos }) => loadTodos(todos)
  });

  if (loading) return "Loading...";
  if (error) return "Something went wrong...";

  return todoList.map((todo) => <TodoItem key={todo.id} {...todo} />);
};

export default observer(Todos);
