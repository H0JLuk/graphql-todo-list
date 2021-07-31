import React from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { observer } from "mobx-react-lite";
import {
  publishTodoGql,
  toggleCompleteTodoGql,
  deleteTodoGql
} from "../api/todoService";
import useStore from "../store/useStore";

const getStyle = ({ completed }) => ({
    background: "#F4F4F4",
    padding: "10px",
    borderBottom: "1px #ccc dotted",
    textDecoration: completed ? "line-through" : "none"
  });

const TodoItem = ({ id, title, completed }) => {
  const { toggleCompleteTodo, deleteTodo } = useStore();

  const [
    toggleCompleteRequest,
    { loading: toggleLoading }
  ] = useMutation(toggleCompleteTodoGql, {
    onCompleted({ updateTodo: { id } }) {
      publishTodoRequest({ variables: { id } });
    }
  });

  const [
    deleteRequest,
    { loading: deleteLoading }
  ] = useMutation(deleteTodoGql, {
    onCompleted({ deleteTodo: { id } }) {
      deleteTodo(id);
    }
  });

  const [
    publishTodoRequest,
    { loading: publishLoading }
  ] = useMutation(publishTodoGql, {
    onCompleted({ publishTodo }) {
      const { __typename, ...todo } = publishTodo;
      toggleCompleteTodo(todo);
    }
  });

  const isLoading = toggleLoading || deleteLoading || publishLoading;

  const onToggleComplete = () => {
    const variables = { id, completed: !completed };
    toggleCompleteRequest({ variables });
  };

  const onDeleteTodo = () => deleteRequest({ variables: { id } });

  return (
    <div style={getStyle({ completed })}>
      <input
        type="checkbox"
        disabled={isLoading}
        style={{ marginRight: 5 }}
        onChange={onToggleComplete}
        checked={completed ? "checked" : ""}
      />
      {title}
      <button
        className="btn"
        onClick={onDeleteTodo}
        disabled={isLoading}
        style={{ float: "right" }}
      >
        X
      </button>
    </div>
  );
};

TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool
};

export default observer(TodoItem);
