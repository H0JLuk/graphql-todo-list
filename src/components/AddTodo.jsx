import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { observer } from "mobx-react-lite";
import { createTodoGql, publishTodoGql } from "../api/todoService";
import useStore from "../store/useStore";

const AddTodo = () => {
  const { addTodo } = useStore();
  const [title, setTitle] = useState("");

  const [
    publishTodoRequest,
    { loading: publishLoading, error: publishError }
  ] = useMutation(publishTodoGql, {
    onCompleted({ publishTodo }) {
      const { __typename, ...todo } = publishTodo;
      addTodo(todo);
      setTitle("");
    }
  });

  const [
    createTodoRequest,
    { loading: createLoading, error: createError }
  ] = useMutation(createTodoGql, {
    onCompleted({ createTodo: { id } }) {
      publishTodoRequest({ variables: { id } });
    }
  });

  const isLoading = createLoading || publishLoading;

  const onSubmit = (e) => {
    e.preventDefault();
    createTodoRequest({ variables: { title } });
  };

  const onChange = (e) => setTitle(e.target.value);

  return (
    <>
      <form onSubmit={onSubmit} style={{ display: "flex" }}>
        <input
          style={{ flex: "10", padding: "5px", marginRight: 5 }}
          placeholder="Add Todo..."
          value={title}
          onChange={onChange}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="btn"
          style={{ flex: "1" }}
          disabled={isLoading || !title}
        >
          Submit
        </button>
      </form>

      {(createError || publishError) && (
        <p>error: {createError || publishError}</p>
      )}
    </>
  );
};

export default observer(AddTodo);
