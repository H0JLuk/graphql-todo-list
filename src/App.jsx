import Header from "./components/layout/Header";
import Todos from "./components/Todos";
import AddTodo from "./components/AddTodo";

import "./App.css";

const App = () => (
  <div className="App">
    <div className="container">
      <Header />
      <br />
      <AddTodo />
      <Todos />
    </div>
  </div>
);

export default App;
