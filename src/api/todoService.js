import { gql } from "@apollo/client";

export const fetchTodosGql = gql`
  query {
    todos {
      id
      title
      completed
    }
  }
`;

export const createTodoGql = gql`
  mutation createTodo($title: String!) {
    createTodo(data: { title: $title }) {
      id
    }
  }
`;

export const toggleCompleteTodoGql = gql`
  mutation toggleCompleteTodo($id: ID, $completed: Boolean) {
    updateTodo(where: { id: $id }, data: { completed: $completed }) {
      id
    }
  }
`;

export const deleteTodoGql = gql`
  mutation deteleTodo($id: ID) {
    deleteTodo(where: { id: $id }) {
      id
    }
  }
`;

export const publishTodoGql = gql`
  mutation publishTodo($id: ID) {
    publishTodo(where: { id: $id }, to: PUBLISHED) {
      id
      title
      completed
    }
  }
`;
