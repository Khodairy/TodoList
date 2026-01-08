import { createContext, useContext, useReducer } from "react";
import { reducer } from "../reducers/todosReducer";
export const TodosContext = createContext([]);

const init = () => JSON.parse(localStorage.getItem("todos")) ?? [];

export const TodosProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, [], init);
  return (
    <>
      <TodosContext.Provider value={{ todos, dispatch }}>
        {children}
      </TodosContext.Provider>
    </>
  );
};

export const useTodos = () => {
  return useContext(TodosContext);
};
